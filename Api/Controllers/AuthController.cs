using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Models;
using Api.Tools;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("/api/auth")]
    public class AuthController : ControllerBase
    {

        private const string adminRole="admin";
        private const string userRole="user";
        public AuthController()
        {
        }

        [Route("login/admin")]
        [HttpPost]
        public async Task<IActionResult> adminLogin([FromBody] UserAdmin data)
        {
            var role= "Admin";
            HttpResponse successResponse=new HttpResponse{
                ok=true,
                statusCode=200,
                msg="you has been loged succesfully as "+ role
            };
            HttpResponse invalidLoginResponse=new HttpResponse{
                statusCode=401,
                ok=false,
                msg="invalid user or password for "+ role,
            };
            HttpResponse invalidBodyResponse=new HttpResponse{
                ok=false,
                statusCode=400,
                msg="invalid body for " + role + " role"
            };
            if(data is UserAdmin == false){
                return StatusCode(400, invalidBodyResponse);
            }
            if(AuthTools.admin(data)){
                await this.loginAs(adminRole);
                return Ok(successResponse);
            }else{
                return StatusCode(401,invalidLoginResponse);
            }
        }

        [Route("login/user")]
        [HttpPost]
        public async Task<IActionResult> userLogin([FromBody] UserUser data)
        {
            var role= "User";
            HttpResponse successResponse=new HttpResponse{
                ok=true,
                statusCode=200,
                msg="you has been loged succesfully as "+ role
            };
            HttpResponse invalidLoginResponse=new HttpResponse{
                statusCode=401,
                ok=false,
                msg="invalid user or password for "+ role,
            };
            HttpResponse invalidBodyResponse=new HttpResponse{
                ok=false,
                statusCode=400,
                msg="invalid body for " + role + " role"
            };
            if(data is UserUser == false){
                return StatusCode(400, invalidBodyResponse);
            }
            if(AuthTools.user(data)){
                await this.loginAs(userRole);
                return Ok(successResponse);
            }else{
                return StatusCode(401,invalidLoginResponse);
            }
        }

        [Route("logout")]
        [HttpGet]
        public async Task<IActionResult> logout()
        {
            HttpResponse response;
            try
            {
                response= new HttpResponse{
                    ok=true,
                    statusCode=200,
                    msg="loged out"
                };

                await HttpContext.SignOutAsync();
                
            }
            catch (System.Exception e)
            {
                response= new HttpResponse{
                    ok=false,
                    statusCode=500,
                    msg="fail on logout"
                };
                
                Console.WriteLine(e);
            }

            return Ok(response);
        }
        
        [Authorize(Policy = "All")]
        [Route("refresh/{role}")]
        [HttpGet]
        public async Task<IActionResult> refresh([FromRoute] string role)
        {
            HttpResponse response;
            try
            {
                var currentRole=HttpContext.User.FindFirst(ClaimTypes.Role).Value;
                
                if(currentRole.ToLower()==role.ToLower()){
                    response= new HttpResponse{
                        ok=true,
                        statusCode=200,
                        msg="of couse you are an "+ currentRole +"!",
                        response=true
                    };
                    await this.loginAs(currentRole);

                }else{
                     response= new HttpResponse{
                        ok=false,
                        statusCode=403,
                        msg="Sorry, only " + role + "s here...",
                        response=false
                    };
                    return StatusCode(401,response);
                }

            }
            catch (System.Exception e)
            {
                response= new HttpResponse{
                    ok=false,
                    statusCode=500,
                    msg="fail on auth refresh",
                };
            
                Console.WriteLine(e);
                return StatusCode(500,response);
            }
           
            return Ok(response);
        }
        
        private async Task loginAs(string rol) {

            var props=new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(30)
            };

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, rol)
            };
            
            var claimsIdentity = new ClaimsIdentity(
                claims,
                CookieAuthenticationDefaults.AuthenticationScheme
            );

           
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                props
            );
        }
    }
}