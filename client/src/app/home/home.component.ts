import { Component, OnInit ,Input,DoCheck, OnChanges, SimpleChanges,AfterViewInit} from '@angular/core';
import { apiRepuestosService } from '../services/api-repuestos.service';
import { FormplacaService } from '../services/formplaca.service';
import {Router} from '@angular/router';
import { Placa } from './Placa';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ apiRepuestosService, FormplacaService]
})
export class HomeComponent implements OnChanges, DoCheck {
placa:string;

title:string;
hay:boolean=false;
auto:any= new Object() ;

miplaca:Placa[]=[];
combustibles:any;
marcas:any;
marca:any;
modelo:any;
anio:any;
color:any;
clase:any;
servicio:any;
combustible:any;
traccion:any;
transmision:any;
tracciones:any;
transmisiones:any;
  constructor(private router: Router,
    private apiRepuestosService:apiRepuestosService,
    private FormplacaService:FormplacaService
  ) { 

this.FormplacaService.getCombustible().subscribe(combustibles =>{
            this.combustibles=combustibles;
            });
this.FormplacaService.getMarcas().subscribe(marcas =>{
            this.marcas=marcas;
            });
this.FormplacaService.getTracciones().subscribe(tracciones =>{
            this.tracciones=tracciones;
            });
this.FormplacaService.getTransmisiones().subscribe(transmisiones =>{
            this.transmisiones=transmisiones;
            });
        
  }

addNuevaPlaca(){
  var newPlaca={
    "placa":this.placa,
    "marca":this.marca,
    "modelo":this.modelo,
    "anio":this.anio,
    "color":this.color,
    "clase":this.clase,
    "servicio":this.servicio,
    "combustible":this.combustible,
    "traccion":this.traccion,
    "transmision":this.transmision
    
  }
  
 // console.log(newPlaca);
  this.apiRepuestosService.addPlaca(newPlaca)
                .subscribe(newPlaca => {
                this.miplaca.push(newPlaca );
                console.log(this.miplaca);

                this.apiRepuestosService.getPlaca(this.placa).subscribe((dat:any) =>{
             //   console.log(dat);
            //    console.log(this.placa);
                this.auto=dat;
                if(this.placa){//console.log('SIIII');
                
      this.router.navigate(['home']);
                localStorage.setItem('encontrar', 'true');
                localStorage.setItem('placa', JSON.stringify(this.miplaca[0]));};
               });


                });
}




  ngOnChanges(changes: SimpleChanges){
  }
  ngDoCheck(){

if(this.apiRepuestosService.getmiPlaca()){
  this.auto=this.apiRepuestosService.getmiPlaca();
  this.hay=this.apiRepuestosService.getmiPlaca2();
 // console.log(this.hay);
}else{
  this.hay=this.apiRepuestosService.getmiPlaca2();
  this.placa=this.apiRepuestosService.getmiPlaca3();
 // console.log(this.hay);
}


  }
  
  ngAfterViewInit() { }
}
