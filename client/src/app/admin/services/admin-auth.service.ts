import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorRedirectionService } from 'src/app/services/error-redirection.service';
import { adminUser } from '../models/adminUser.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(
    private router: Router,
    private errors: ErrorRedirectionService
  ) { }


  async login(user:adminUser):Promise<boolean>{
    var res;
    try {
      res = await fetch("/api/auth/login/admin",{
        method:"post",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(user)
      });
      res=await res.json()
      if(res.ok){
        this.router.navigateByUrl("/admin")
        return true
      }else{
        await this.errors.serverError();
        console.warn(res)
        return false
      }
    } catch (err) {
      await this.errors.serverError();
      console.warn(err)
    }
  }

  async logout(){
    try {
      await fetch("/api/auth/logout")
    } catch (err) {
      await this.errors.serverError();
      console.warn(err)
    }
  }
}
