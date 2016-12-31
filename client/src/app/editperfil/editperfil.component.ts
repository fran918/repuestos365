import { Component, OnInit } from '@angular/core';

import { apiPerfilService } from '../services/api-perfil.service';
import { AuthService } from '../services/auth.service';
import { Perfil } from './Perfil';

@Component({
  selector: 'app-editperfil',
  templateUrl: './editperfil.component.html',
  styleUrls: ['./editperfil.component.css'],
  providers:[apiPerfilService, AuthService]
})
export class EditperfilComponent implements OnInit {
  profile:any;
perfil:Perfil[];
perfil2:any = new Object();
nombre:string;
apellido:string;
telefono:number;

  constructor(
    private apiPerfilService:apiPerfilService,
     private AuthService:AuthService) { 
       console.log('this.profile');
            var perfil = this.perfil;
            this.profile = JSON.parse(localStorage.getItem('profile'));
            console.log(this.profile.identities[0].user_id);
            this.apiPerfilService.getPerfil(this.profile.identities[0].user_id).subscribe(perfil =>{
            console.log(perfil);
            this.perfil=perfil;
           // this.perfil2.nombre=perfil.nombre;
           // this.perfil2.apellido=perfil.apellido;
            //this.perfil2.telefono=perfil.telefono;
            //console.log(this.perfil);
            })  
            //console.log(this.perfil2);
          
  }

updateStatus(event:any){
  event.preventDefault();

  var miperfil={
    _id:this.profile.identities[0].user_id,
    nombre: this.perf.nombre,
    apellido: this.perf.apellido,
    telefono: this.perf.telefono
  };
  console.log(miperfil);
  this.apiPerfilService.updatePerfil(miperfil).subscribe(data => {
  });
  console.log(perfil);
}



  ngOnInit() {
  }

}
