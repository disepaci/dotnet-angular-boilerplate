import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './private/private.module';
import { PublicModule } from './public/public.module';


import { AppComponent } from './app.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';


@NgModule({
  declarations: [
    AppComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,

    AppRoutingModule,
    AdminModule,
    UserModule,
    PublicModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
