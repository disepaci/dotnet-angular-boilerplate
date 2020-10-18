import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivateComponent } from './private.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PrivateComponent,
    LoginComponent, 
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    PrivateComponent,
    LoginComponent, 
    DashboardComponent
  ]
})
export class UserModule { }
