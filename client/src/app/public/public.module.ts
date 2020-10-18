import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class PublicModule { }
