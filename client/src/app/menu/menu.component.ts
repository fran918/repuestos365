import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AuthService]
})
export class MenuComponent implements OnInit {
  public isCollapsed = false;
  menuIcon:string = 'fa-bars';
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
