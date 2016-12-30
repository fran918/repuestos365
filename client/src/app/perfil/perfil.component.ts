import { Component, OnInit } from '@angular/core';

import { apiPerfilService } from '../services/api-perfil.service';

import { Perfil } from '../../Perfil';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers:[apiPerfilService]
})
export class PerfilComponent implements OnInit {
perfil:Perfil[];

//id del usuario **se tiene que cambiar**
id='5862bbaeba89250100cbbee1'; 

  constructor(
    private apiPerfilService:apiPerfilService) { 
       var perfil = this.perfil;
             
            this.apiPerfilService.getPerfil(this.id).subscribe(perfil =>{
            console.log(perfil);
            this.perfil=perfil;
            console.log(this.perfil);
            })  
console.log(this.perfil + '' );
          
            
        }

  ngOnInit() {
  }

}
