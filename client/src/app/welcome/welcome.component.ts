import {
  Component,
  OnInit,
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';


import {bgConfig} from './bgConfig';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    trigger("fadeInOut", [
      state("open", style({opacity: 1})),
      state("closed", style({opacity: 0})),
      transition("open => closed", animate( "10000ms" )),
      transition("closed => open", animate( "15000ms" )),
    ])
  ],
  providers: [AuthService]
})
export class WelcomeComponent implements OnInit {
  state = 'open';
  bgImages:any = bgConfig;
  fna:number;
  bgImage:any;

  mail = {
    name:"jose",
    email:"jairo85cd1@gmail.com",
    subject:"Email Example",
    message: "Hola mundo"
  }
  constructor(private auth: AuthService, private router: Router) {
     
    //console.log(this.bgImage);
  }

  ngOnInit() {
    if(this.auth.authenticated()){
      this.router.navigateByUrl('/home');
    }
    this.bgImage = this.bgImages[0];
    

    
  }

}
