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
perfil:Perfil[]=[];
perfil2:any = new Object();
perf:any= new Object();
nombre:string;
apellido:string;
telefono:number;
validar:boolean=false;
usuarioid:any='';
  constructor(
    private apiPerfilService:apiPerfilService,
     private AuthService:AuthService) { 
            var perfil = this.perfil;
           this.profile = JSON.parse(localStorage.getItem('profile'));
            this.usuarioid=this.profile.identities[0].user_id;
            console.log(this.usuarioid);
           // console.log(this.profile.identities[0].user_id);
            this.apiPerfilService.getPerfil(this.profile.identities[0].user_id).subscribe(perfil =>{
           // console.log(perfil);
            this.perfil=perfil;
            if(perfil){
            this.perfil2.nombre=perfil.nombre;
            this.perfil2.apellido=perfil.apellido;
            this.perfil2.telefono=perfil.telefono; this.validar=true;}else{this.validar=false;}
            //console.log(this.perfil);
            })  
           // console.log(this.perfil2);
          
  }

  updatePerfil(event:any){
  event.preventDefault();
  var newPerfil={
    "user_idTK":this.usuarioid,
    "user_id":this.profile.identities[0].user_id,
    "nombre":this.perfil2.nombre,
    "apellido":this.perfil2.apellido,
    "telefono":this.perfil2.telefono
  }
  
  console.log(newPerfil);
  
  console.log(this.profile.identities[0].user_id);
  if(this.validar){
this.apiPerfilService.updatePerfil(newPerfil).subscribe((miperfil:any) => {
  this.perfil.push(miperfil);
  });
}else{
  this.apiPerfilService.addPerfil(newPerfil)
      .subscribe(miperfil => {
      this.perfil.push( 
        {
          "user_idTK":this.usuarioid,
          "user_id":this.profile.identities[0].user_id,
          "nombre":this.perfil2.nombre,
          "apellido":this.perfil2.apellido,
          "telefono":this.perfil2.telefono
        });
      });
}
  
 // console.log(newPerfil);
}



  ngOnInit() {
     
  }

}
