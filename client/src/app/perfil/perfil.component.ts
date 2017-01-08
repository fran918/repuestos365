import { Component, OnInit ,AfterViewInit} from '@angular/core';

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
     //  console.log(this.profile);
       this.apiPerfilService.getPerfil(this.profile.identities[0].user_id).subscribe(perfil =>{
        //    console.log(perfil);
            this.perfil2=perfil;
          // console.log(this.perfil2);
            }) 
       /*
            */
        }

  ngOnInit() {
  }
  ngAfterViewInit() { }
}
