import { Component, OnInit , ViewChild,AfterViewInit} from '@angular/core';
import { VendedoresService } from '../services/vendedores.service';
import { AuthService } from '../services/auth.service';
import { apiPerfilService } from '../services/api-perfil.service';
import { Vendedor } from '../vender/Vendedor';
import {Router} from '@angular/router'
import { FormModel } from '../auth/form.model';

@Component({
  selector: 'app-editvendedor',
  templateUrl: './editvendedor.component.html',
  styleUrls: ['./editvendedor.component.scss'],
  providers:[ AuthService, apiPerfilService, VendedoresService]
})
export class EditvendedorComponent implements OnInit {
    @ViewChild('select') selectElRef;
aceptar=false;
newPerfil:any;
profile:any;
vendedor:Vendedor[]=[];
lon:any; 
nombre_local:any=''; RUC:any=''; telf:any=''; provincia:any=''; edomicilio:any=''; 
lat:any;
perfil:any;
eresVendedor:boolean=false;

  lat2: number = 10.2319196;
 lng2: number = -67.8832;


 
mapConfi = {
    title: 'My first angular2-google-maps project',
    lat:this.lon,
    lon: this.lat,
    zoom: 14,
    zoomControl: 'disenabled',
    styles: 'HYBRID'
}

modelSignup = new FormModel("","","");
marcas:any;myOptions:any;selectedValues = [];mismarcas = [];
  constructor(private VendedoresService: VendedoresService,
  private router: Router,private AuthService:AuthService, private apiPerfilService:apiPerfilService,
    private auth: AuthService) { 


      this.VendedoresService.getMarcas().subscribe(marcas =>{
       //console.log(marcas);
        this.marcas=marcas;
        this.myOptions = marcas;
    });



    this.profile = JSON.parse(localStorage.getItem('profile'));
   
   this.apiPerfilService.getVendedor(this.profile.identities[0].user_id).subscribe(perfil =>{
          //  console.log(perfil);
            this.perfil=perfil;
          // console.log(this.perfil);
           if(this.perfil){this.eresVendedor=true;}else{this.eresVendedor=false;}
            })

    }
changeListener($event) : void {
 // console.log(this.rep);
  this.readThis($event.target);
}
image:any;
readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    
  }
  myReader.readAsDataURL(file);
}


    change(options) {
      //console.log(options);console.log(this.selectedValues);
    this.selectedValues = Array.apply(null,options)
      .filter(option => option.selected)
          .map(option => option.value)
      }
    ngAfterViewInit() {
        this.updateSelectList();
      }
      updateSelectList() {
        let options = this.selectElRef.nativeElement.options;
        
        for(let i=0; i < options.length; i++) {//console.log(this.selectedValues);
          options[i].selected = this.selectedValues.indexOf(options[i].value) > -1;
        }
      //  console.log(options);console.log(this.selectedValues);
      }
 aceptarVender(){
      this.aceptar=!this.aceptar;
      this.newPerfil={
                        "email":this.modelSignup.email,
                        "lat":this.lat,
                        "lng":this.lon,
                        "nombre_local":this.nombre_local,
                        "RUC":this.RUC,
                        "telf":this.telf,
                        "provincia":this.provincia,
                        "edomicilio":this.edomicilio,
                        "admin":'vendedor',
                        "marcas":this.mismarcas,
                        "imagen":this.image
                    }
    }

    vender(event:any){
      event.preventDefault();
        //console.log('signup');
    this.auth.signUp(this.modelSignup.fullname,this.modelSignup.email, this.modelSignup.password)
    
     this.apiPerfilService.getCheckVendedor(this.modelSignup.email).subscribe(perfil =>{
          //  console.log(perfil);
  this.apiPerfilService.addVendedor(this.newPerfil)
      .subscribe(miperfil => {
      this.vendedor.push(miperfil);

           this.router.navigate(['home']);
      });
  });
}
location:any='';
obtenerPosicion (position) {

	setTimeout( position => this.location = position.coords, 0);
//	console.log(this.location);
  if(position.coords.longitude){this.lon = position.coords.longitude; this.mapConfi.lon=this.lon;};	
  if(position.coords.latitude){this.lat = position.coords.latitude;	this.mapConfi.lat=this.lat;};
//console.log(this.lon+' ' + this.lat);

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
  }

pos(event){
       
         this.lat=event.coords.lat;   console.log(event.coords.lat);
         this.lon=event.coords.lng;   console.log(event.coords.lng);
       
    }

     
}
