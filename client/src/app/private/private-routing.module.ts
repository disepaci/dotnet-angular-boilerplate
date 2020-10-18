import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivateGuard } from './guards/private.guard';
import { LoginComponent } from './login/login.component';

const routes:Routes=[
  {path:"private/login", component: LoginComponent},
  {path:"private",
    canActivate:[PrivateGuard],
    children:[
      {path:"dashboard",component:DashboardComponent},
      {path:"",redirectTo:"dashboard", pathMatch:"full"}
    ],
  },
   
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})

export class PrivateRoutingModule { }
