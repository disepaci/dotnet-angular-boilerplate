import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorRedirectionService {

  constructor(
    private router: Router
  ) { }

  serverError(){
    return new Promise((resolve)=>{
      this.router.navigateByUrl("/error/500")
      .then(()=>resolve())
    })
  }

  notFound(){
    return new Promise((resolve)=>{
      this.router.navigateByUrl("/error/404")
      .then(()=>resolve())
    })
  }
}
