import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthService } from '../services/auth.service';

import { FormModel } from './form.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {
  modelLogin = new FormModel("","","");
  modelSignup = new FormModel("","","");
  constructor(
    public router: Router,
    public http: Http,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    
  }
  logIn(){
    console.log('login');
    this.auth.login(this.modelLogin.email, this.modelLogin.password)
  }
  signUp(){
    console.log('signup');
    this.auth.signUp(this.modelSignup.fullname,this.modelSignup.email, this.modelSignup.password)
  }

}
