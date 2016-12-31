import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { apiRepuestosService } from '../services/api-repuestos.service';
import { Auto } from './Auto';
import { Pedido } from './Pedido';

@Component({
  selector: 'app-busqueda-repuesto',
  templateUrl: './busqueda-repuesto.component.html',
  styleUrls: ['./busqueda-repuesto.component.css'],
  providers:[AuthService, apiRepuestosService]
})
export class BusquedaRepuestoComponent implements OnInit {
profile:any;
auto:Auto[];
pedido:Pedido[]=[];

repuesto:string;
cantidad:number=1;

  constructor(
     private AuthService:AuthService,
     private apiRepuestosService: apiRepuestosService) { 
this.profile = JSON.parse(localStorage.getItem('profile'));
       console.log(this.profile);
      
        
  }
  
addPedido(event:any){
  event.preventDefault();
  var newPedido={
    "repuesto":this.repuesto,
    "cantidad":this.cantidad,
    "user":this.profile.identities[0].user_id
  }
  
  console.log(newPedido);
  this.apiRepuestosService.addPedido(newPedido)
      .subscribe(mipedido => {
      this.pedido.push(mipedido);
      });
}








  ngOnInit() {


  }

}
