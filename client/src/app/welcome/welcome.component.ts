import {
  Component,
  OnInit,Input , Output, EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate
  ,AfterViewInit
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
  placa:any;
   miplaca(valor){
    this.placa=valor;
    console.log('welcomecomponent'+this.placa);
  }
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
    this.fna =0; 
	//this.bgImages.length - 1;
    this.bgImage = this.bgImages[this.fna];
    /*let i = 0;
    let timer = Observable.timer(10000,5000);
    timer.subscribe(t=> {
      this.state = this.state === 'open' ? 'closed' : 'open';
      this.bgImage = this.bgImages[i];
      //console.log(this.bgImage);
      //console.log(this.state);
      i++;
      if(i > 4){
        i = 0;
      }
    });*/

    
  }
  ngAfterViewInit() { }
}
