import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router
  ){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    var passport=await this.authRequest()

    if(passport){
      return true;
    }else{
     this.router.navigateByUrl("/admin/login")
     return false   
    }
    
  }
  
  async authRequest():Promise<boolean>{
    var res;
    try {
      res= await (await fetch("/api/auth/refresh/admin")).json()
      return res.ok
    } catch (error) {
      return false
    }
  }
}
