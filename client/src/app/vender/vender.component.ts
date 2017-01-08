import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { apiPerfilService } from '../services/api-perfil.service';
import { Vendedor } from './Vendedor';
@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css'],
  providers:[ AuthService, apiPerfilService]
})
export class VenderComponent implements OnInit {
aceptar=false;
newPerfil:any;
profile:any;
vendedor:Vendedor[]=[];
lon:any; nombre_local:any=''; RUC:any=''; telf:any=''; provincia:any=''; edomicilio:any=''; 
lat:any;
perfil:any;
eresVendedor:boolean=false;
  constructor(private AuthService:AuthService, private apiPerfilService:apiPerfilService) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
   
   this.apiPerfilService.getVendedor(this.profile.identities[0].user_id).subscribe(perfil =>{
           // console.log(perfil);
            this.perfil=perfil;
           console.log(this.perfil);
            })
            if(this.perfil){this.eresVendedor=true;}else{this.eresVendedor=false;}
  
}

    aceptarVender(){
      this.aceptar=!this.aceptar;
      this.newPerfil={
                        "user_id":this.profile.identities[0].user_id,
                        "email":this.profile.email,
                        "lat":this.lat,
                        "lng":this.lon,
                        "nombre_local":this.nombre_local,
                        "RUC":this.RUC,
                        "telf":this.telf,
                        "provincia":this.provincia,
                        "edomicilio":this.edomicilio
                    }
    }

    vender(event:any){
      event.preventDefault();
      //console.log(this.newPerfil);
  this.apiPerfilService.addVendedor(this.newPerfil)
      .subscribe(miperfil => {
      this.vendedor.push(miperfil);
      });
  
}
location:any='';
obtenerPosicion (position) {
	setTimeout( position => this.location = position.coords, 0);
//	console.log(this.location);
  if(position.coords.longitude){this.lon = position.coords.longitude;};	
  if(position.coords.latitude){this.lat = position.coords.latitude;	};
console.log(this.lon+' ' + this.lat);

}
VerError (error) {
	alert(error.code);
}	

  ngOnInit() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.obtenerPosicion.bind(this), this.VerError);
  } else {
    console.log("Your browser does not support Geolocation!");
  }
    };
   }
  


 