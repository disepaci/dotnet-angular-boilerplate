import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AdminRoutingModule } from './admin/admin-routing.module';
import { PublicRoutingModule } from './public/public-routing.module';
import { PrivateRoutingModule } from "./private/private-routing.module";
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

const routes:Routes=[
/*
  /admin = adminRoutingModule / forchild routes
  /store = privateRoutingModule / forchild routes
  /public = publicRoutingModule / forRoot routes
*/
  {path:"", redirectTo:"/public", pathMatch:"full"},
  {
    path:'error',
    children:[
      {path:"500",component:ServerErrorComponent},
      {path:"404",component:PageNotFoundComponent},    
    ]
  },
  {path:"**", component:PageNotFoundComponent}
]


@NgModule({
  declarations: [],
  imports:[
    RouterModule.forRoot(routes),
    PrivateRoutingModule,
    AdminRoutingModule,
    PublicRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
