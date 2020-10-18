import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    AdminComponent,
    DashboardComponent, 
    LoginComponent
  ]
})
export class AdminModule { }
