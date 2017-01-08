import { Component, OnInit,Input ,AfterViewInit} from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from '../services/auth.service';
import { apiRepuestosService } from '../services/api-repuestos.service';
import {Observable} from 'rxjs/Rx';
import { Pedido } from './Pedido';

@Component({
  selector: 'app-busqueda-repuesto',
  templateUrl: './busqueda-repuesto.component.html',
  styleUrls: ['./busqueda-repuesto.component.css'],
  providers:[AuthService, apiRepuestosService]
})
export class BusquedaRepuestoComponent implements OnInit {
  sub:any;
  sub2:any;
  submit=false;
profile:any;
pedido:Pedido[]=[];
repuesto:string;
cantidad:number=1;
form:any= [1];
private date;
   hexSeconds:any;
lon:any;lat:any;
auto:any= new Object() ;

  constructor(private router: Router,
              private AuthService:AuthService,
              private apiRepuestosService: apiRepuestosService) { 
this.date =  new Date(); 
setInterval(() => {
        this.date =  new Date();
        this.hexSeconds = Math.floor(this.date/1000);
    //    console.log(this.hexSeconds);console.log(this.date);
     }, 1000);
                if(this.sub > 0){}else{
 // this.sub=(Math.floor((Math.random() * 1000000000000000000) + 1)).toString();;
 this.sub=String(this.hexSeconds);
  //this.sub=100;
  this.sub2=this.sub;
}
this.profile = JSON.parse(localStorage.getItem('profile'));// console.log(this.profile);
}



addForm(){
  this.form.push('1');
  //console.log(this.form);
}
addPedido(){
  this.submit=!this.submit;
 // console.log(this.submit);
  var newPedido={
    "id_carrito":this.sub2,
    "user":this.profile.identities[0].user_id,
    "lat":this.lat,
    "lon":this.lon,
    "marca":this.auto.marca
  }
 this.apiRepuestosService.addPedidoCompleto(newPedido)
      .subscribe(mipedido => {
      this.pedido.push(mipedido);
   //   console.log(this.pedido);
      this.router.navigate(['cotizaciones']);
      });

}





location:any='';
obtenerPosicion (position) {
	setTimeout( position => this.location = position.coords, 0);
//	console.log(this.location);
  if(position.coords.longitude){this.lon = position.coords.longitude;};	
  if(position.coords.latitude){this.lat = position.coords.latitude;	};
//console.log(this.lon+' ' + this.lat);

}
VerError (error) {
	alert(error.code);
}	
  ngOnInit() {
let timer = Observable.timer(1000,1000);
    timer.subscribe(t=>{this.date =  new Date();
      
        this.hexSeconds = Math.floor(this.date/1000);this.sub2=String(this.hexSeconds);
      //console.log(this.hexSeconds);console.log(this.date);
    });
    this.auto = JSON.parse(localStorage.getItem('placa'));
if(this.apiRepuestosService.getmiPlaca()){this.auto=this.apiRepuestosService.getmiPlaca();}
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.obtenerPosicion.bind(this), this.VerError);
  } else {
    console.log("Your browser does not support Geolocation!");
  }

  }
  ngAfterViewInit() { }
}
