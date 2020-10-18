import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from './guards/admin.guard';


const routes:Routes=[
  {path:"admin/login", component:LoginComponent},
  {
    path:"admin",
    canActivate:[AdminGuard],
    children:[
      {path:"dashboard", component: DashboardComponent},
      {path:"", redirectTo:"/admin/dashboard", pathMatch:'full'}    
    ]
  },

]


@NgModule({
  imports: [
    RouterModule.forChild(routes)    
  ],
  exports:[RouterModule]
})
export class AdminRoutingModule { }
