import { Component, OnInit } from '@angular/core';
import { userUser } from '../models/userUser.model';
import { PrivateAuthService } from '../services/private-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  creds:userUser=new userUser();

  constructor(
    private authService:PrivateAuthService
  ) { }

  ngOnInit(): void {
    this.creds.pwd="root"
    this.creds.user="root"
    this.submit(this.creds)
  }

  submit(creds:userUser){
    var res;
    this.authService.login(creds);

  }
}
