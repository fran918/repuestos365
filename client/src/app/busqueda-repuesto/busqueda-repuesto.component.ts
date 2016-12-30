import { Component, OnInit } from '@angular/core';
import { apiRepuestosService } from '../services/api-repuestos.service';
import { Repuestos } from '../../Repuestos';
import { Auto } from '../../Auto';

@Component({
  selector: 'app-busqueda-repuesto',
  templateUrl: './busqueda-repuesto.component.html',
  styleUrls: ['./busqueda-repuesto.component.scss'],
  providers:[apiRepuestosService]
})
export class BusquedaRepuestoComponent implements OnInit {
repuestos:Repuestos[];
auto:Auto[];
  constructor(private apiRepuestosService:apiRepuestosService) { 

        this.apiRepuestosService.getRepuestos().subscribe(repuestos =>{
        console.log(repuestos);
        this.repuestos=repuestos;
        
      })

  }


addRepuesto(item:any){

            var repuestos = this.repuestos;
           
  var newItem={
    "repuesto":item,
    "user_id":"asdafasasdasd"
  }
  console.log(newItem);

  this.apiRepuestosService.addRepuesto(newItem)
      .subscribe(repuestos => {
      this.repuestos.push(repuestos);
      });


}








  ngOnInit() {


  }

}
