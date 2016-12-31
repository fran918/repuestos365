import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { myConfig } from './auth.config';

// Avoid name not found warnings
let Auth0Lock: any = require('auth0-lock').default;

// Avoid name not found warnings
declare var Auth0: any;

@Injectable()

export class AuthService {
  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {});
  
  // Configure Auth0
  auth0 = new Auth0({
    domain: myConfig.domain,
    clientID: myConfig.clientID,
    //callbackOnLocationHash: true,
    responseType: myConfig.responseType,
    callbackURL: myConfig.callbackURL,
  });

  private baseUrl: string = 'http://localhost:8080';
  //private baseUrl: string = 'http://nodejs-mongo-persistent-rep-365.44fs.preview.openshiftapps.com';
  
  constructor(private router: Router, private http: Http) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (result:any) => {
      this.lock.getProfile(result.idToken, function(error:any, profile:any){
        if(error){throw new Error(error);
        }
        localStorage.setItem('id_token', result.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      })
      
    });
    var result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      this.lock.getProfile(result.idToken, function(error:any, profile:any){localStorage.setItem('profile', JSON.stringify(profile));})
      localStorage.setItem('id_token', result.idToken);
      localStorage.setItem('id_token3', result.idToken);
      this.router.navigate(['/home']);
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  }

  public login(email:any, password:any) {
    // Call the show method to display the widget.
    //this.lock.show();
    this.auth0.login({
      connection: 'rep365DB',
      //connection: 'repuestos365DB-local',
      responseType: 'token',
      email: email,
      password: password,
    }, function(err) {
      if (err) alert("algo salió malllll: " + err.message);
    });
  };

  public signUp(fullname:any ,email:any, password:any) {
    this.auth0.signup({
      connection: 'rep365DB',      
      responseType: 'token',
      name:fullname,
      email: email,
      password: password,
    }, function(err) {
	  alert('El usuario ya esta registrado!!!');
      if (err.message == 'usuario ya exists') {
        alert("algo salió mal: " + err.message);
        console.log(err);
      }
    });
   /* let body = {
      name: fullname,
      email: email,
      password: password
    }
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request options

    return this.http.post(this.baseUrl+'/api/auth-signup', bodyString, options)
    .subscribe((data:any) => {
      if(data.status === 200){
        let b = JSON.parse(data._body);
        if(b.fromSandbox){
          alert('El usuario ya esta registrado!!!');
        }else{
          console.log('login');
		  alert("HASTA AQUI BIEN");
          this.login(email, password);
        }
        //console.log(b.fromSandbox);
      }
      //alert('Enviado con Exito');
    });*/
  };

  public googleLogin() {
    this.auth0.login({
      connection: 'google-oauth2'
    }, function(err) {
      if (err) alert("algo salió mal: " + err.message);
    });
  };

  public facebookLogin() {
    this.auth0.login({
      connection: 'facebook'
    }, function(err) {
      if (err) alert("algo salió mal: " + err.message);
    });
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigateByUrl('/');
  };
  
}
