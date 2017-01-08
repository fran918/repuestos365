import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { apiRepuestosService } from '../services/api-repuestos.service';
import { Repuestos } from './Repuestos';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css'],
  providers:[apiRepuestosService]
})
export class CotizacionesComponent implements OnInit {
repuestos:Repuestos[];
verrepuestos:Repuestos[]=[];
repuesto:string;
cantidad:number;
profile:any;
  constructor(private router: Router,private apiRepuestosService:apiRepuestosService) { 
    this.profile = JSON.parse(localStorage.getItem('profile'));
      this.apiRepuestosService.getMisPedidos(this.profile.identities[0].user_id).subscribe(repuestos =>{
       //console.log(repuestos);
        this.repuestos=repuestos;

      })

  }
pedido:any;
ver_pedido(repuesto){
 // console.log(repuesto);
  this.pedido=repuesto;
            this.apiRepuestosService.getMiPedido(repuesto).subscribe(repuesto =>{
      //    console.log(repuesto);
            this.verrepuestos=repuesto;
            })
          }  
deletePedido(id:any){
  //console.log(id);
   var pedido = this.repuestos;
   //console.log(pedido);
            this.apiRepuestosService.deletePedido(id).subscribe(data => {
              if(data.n == 1){
                for(var i =0; i< pedido.length;i++){
                  if(pedido[i].id_carrito == id){
                    pedido.splice(i, 1);
                    //   console.log(pedido[i]);
                  }
                }
              }else{
               // console.log(data);
              }
           
      this.router.navigate(['home']);
              
            })
            
        }    






  ngOnInit() {
  }
  ngAfterViewInit() { }
}
