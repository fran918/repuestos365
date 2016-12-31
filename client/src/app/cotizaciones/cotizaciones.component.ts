import { Component, OnInit } from '@angular/core';
import { apiRepuestosService } from '../services/api-repuestos.service';
import { Repuestos } from './Repuestos';

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
  constructor(private apiRepuestosService:apiRepuestosService) { 
      this.apiRepuestosService.getRepuestos().subscribe(repuestos =>{
       // console.log(repuestos);
        this.repuestos=repuestos;

      })

  }

ver_pedido(repuesto){
            this.apiRepuestosService.getRepuesto(repuesto).subscribe(repuesto =>{
          //  console.log(repuesto);
            this.verrepuestos=repuesto;
            })
          }  
    



addRepuesto(item:any){
            var repuestos = this.repuestos;
           
  var newItem={
    "repuesto":item,
    "user_id":"asdafasasdasd"
  }
  //console.log(newItem);

  this.apiRepuestosService.addRepuesto(newItem)
      .subscribe(repuestos => {
      this.repuestos.push(repuestos);
      });


}



  ngOnInit() {
  }

}
