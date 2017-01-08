import { Component, OnInit, Input, Output, EventEmitter,DoCheck,AfterViewInit} from '@angular/core';
import { ApiRestService } from '../services/api-rest.service';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router'
import { apiRepuestosService } from '../services/api-repuestos.service';
import { Placa } from './Placa';

@Component({
  selector: 'app-search-plate',
  templateUrl: './search-plate.component.html',
  styleUrls: ['./search-plate.component.scss'],
  providers:[ApiRestService, apiRepuestosService]
})
export class SearchPlateComponent implements OnInit, DoCheck {
  auto:any= new Object() ;
placa:Placa[]=[];
  constructor(
    private router: Router,
    private apiRest: ApiRestService, 
    private apiRepuestosService:apiRepuestosService) { }


  getPlaca(miplaca:any){
localStorage.removeItem('placa');
localStorage.removeItem('encontrar');



  //  console.log('placa');
   // console.log(miplaca);
    if(miplaca.length == 7){
      this.apiRepuestosService.getPlaca(miplaca).subscribe((placa:any) =>{
    //  console.log(placa);
      this.placa=placa;
        if(this.placa){//console.log('SIIII');
        localStorage.setItem('encontrar', 'true');
        this.router.navigate(['home']);
      localStorage.setItem('placa', JSON.stringify(this.placa));}else{  
        //console.log('NOOOO');
       // console.log('plate');
        //console.log(placa);
          if (placa == null) {
<<<<<<< HEAD
             this.apiRest.getCarPlate(miplaca).subscribe((data:any) => {
          //  console.log('data');
            placa=data;
          //  console.log('data '+placa.modelo);
            if(placa.modelo){
            if(data){localStorage.setItem('placa', JSON.stringify(data));}
=======
            placa={"placa":"JBE0131","marca":"ZOTYE","modelo":"NOMADA 1.3","anio":"2007","color":"PLATEADO","clase":"VEHICULO UTILITARIO","servicio":"PARTICULAR","aniom":"2016","fecham":"27-06-2016","fechac":"26-06-2021"};
            //this.apiRest.getCarPlate(miplaca).subscribe((data:any) => {
            console.log('data');
            //placa=data;
>>>>>>> 633e3d9bdb2b80311371dc8a53ce846d64b123d1
              this.apiRepuestosService.addPlaca(placa)
                .subscribe(miperfil => {
                this.placa.push(placa );
              //  console.log(this.placa);
                
                });
           localStorage.setItem('encontrar', 'true');
           this.router.navigate(['home']);
            }else{//console.log('NO SE ENCONTRO');
            localStorage.setItem('encontrar-placa', JSON.stringify(miplaca));
            localStorage.setItem('encontrar', 'false');
          };
          });
          }else{}
        }


      })     
    }
  }
            
        

  
  
  ngOnInit() {
  }
  ngDoCheck(){
if(this.apiRepuestosService.getmiPlaca()){this.auto=this.apiRepuestosService.getmiPlaca();}

  }
  ngAfterViewInit() { }
}
