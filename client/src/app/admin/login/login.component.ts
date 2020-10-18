import { Component, OnInit } from '@angular/core';
import { adminUser } from '../models/adminUser.model';
import { AdminAuthService } from '../services/admin-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  creds:adminUser=new adminUser();

  constructor(
    private authService:AdminAuthService
  ) { }

  ngOnInit(): void {
    this.creds.pwd="root"
    this.creds.user="root"
    this.submit(this.creds)
  }


  submit(creds:adminUser){
    var res;
    this.authService.login(creds);

  }

}
