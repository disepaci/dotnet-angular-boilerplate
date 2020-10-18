using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

 
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string dbString = Configuration.GetValue<String>("Settings:DBString");
            
            // services.AddDbContext<dbContextTypeHere>(options =>
            //         options.UseSqlServer(dbString)
            // );

            services.AddControllers();

            services.AddAuthentication(options => { 
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme; 
            }).AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options => {
                options.Cookie.Name = "auth_cookie";
                options.Events = new CookieAuthenticationEvents
                {                          
                    OnRedirectToLogin = redirectContext =>
                    {
                        redirectContext.Response.StatusCode=401;
                        return Task.CompletedTask;
                    }
                };                
            });

            
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("User", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireRole("User");
                });
                options.AddPolicy("All", policy =>
                {
                    policy.RequireAuthenticatedUser();
                   
                });
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            // middelware to serve angular project from this api server
            app.Use(async (context, next) =>
            {
                await next();
                // If there's no available file and the request doesn't contain an extension, we're probably trying to access a page. and route is not api route
                // Rewrite request to use app root
                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value)&& !Regex.IsMatch(context.Request.Path.Value, @"^/api/.*") )
                {
                    context.Request.Path = "/index.html"; 
                    context.Response.StatusCode = 200; 
                    await next();
                }
            });
            
            app.UseFileServer();

            app.UseRouting();
            
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCookiePolicy();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
