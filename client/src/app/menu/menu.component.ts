import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AuthService]
})
export class MenuComponent implements OnInit {
  @Output() miplaca: EventEmitter<any> = new EventEmitter();
  public isCollapsed = false;
  menuIcon:string = 'fa-bars';
  mi_placa:any;
  miplaca2(valor){
    console.log(valor);
    this.mi_placa=valor;
    this.miplaca.emit(this.mi_placa);
    console.log('menucomponent'+valor);
  }
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  openCloseMenu(){
    this.isCollapsed = !this.isCollapsed
    if(this.isCollapsed){
      this.menuIcon = 'fa-times';
    }else{
      this.menuIcon ='fa-bars';      
    }
  }
  
  brandGo(){
    if(this.auth.authenticated()){
      this.router.navigateByUrl('/home');
      console.log('home');
      
    }else{
      this.router.navigateByUrl('/');
      console.log('welcome');
    }
    this.openCloseMenu();
  }

}
