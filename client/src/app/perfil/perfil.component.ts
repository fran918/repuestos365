import { Component, OnInit } from '@angular/core';

import { apiPerfilService } from '../services/api-perfil.service';
import { AuthService } from '../services/auth.service';
import { Perfil } from './Perfil';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers:[apiPerfilService, AuthService]
})
export class PerfilComponent implements OnInit {
  profile:any;
perfil:Perfil[];
perfil2:any = new Object();

nombre:'helooo';

  constructor(
    private apiPerfilService:apiPerfilService,
     private AuthService:AuthService) { 
       this.profile = JSON.parse(localStorage.getItem('profile'));
       console.log(this.profile);
       /*
            */
        }

  ngOnInit() {
  }

}
