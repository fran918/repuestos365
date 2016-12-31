import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ApiRestService } from '../services/api-rest.service';
import { AuthService } from '../services/auth.service';
import { apiRepuestosService } from '../services/api-repuestos.service';
import { Placa } from './Placa';

@Component({
  selector: 'app-search-plate',
  templateUrl: './search-plate.component.html',
  styleUrls: ['./search-plate.component.scss'],
  providers:[ApiRestService, apiRepuestosService]
})
export class SearchPlateComponent implements OnInit {
    @Output() miplaca2: EventEmitter<any> = new EventEmitter();
placa:Placa[]=[];
  constructor(private apiRest: ApiRestService, private apiRepuestosService:apiRepuestosService) { }


  getPlaca(miplaca:any){
    console.log('placa');
    console.log(miplaca);
    if(miplaca.length == 7){
      this.apiRepuestosService.getPlaca(miplaca).subscribe((placa:any) =>{
      console.log(placa);
      this.placa=placa;
        if(this.placa){console.log('SIIII');}else{  console.log('NOOOO');
        console.log('plate');
        console.log(placa);
          if (placa == null) {
            placa={"placa":"JBE0131","marca":"ZOTYE","modelo":"NOMADA 1.3","anio":"2007","color":"PLATEADO","clase":"VEHICULO UTILITARIO","servicio":"PARTICULAR","aniom":"2016","fecham":"27-06-2016","fechac":"26-06-2021"};
            //this.apiRest.getCarPlate(miplaca).subscribe((data:any) => {
            console.log('data');
            //placa=data;
              this.apiRepuestosService.addPlaca(placa)
                .subscribe(miperfil => {
                this.placa.push(placa );
                });
           
           // });
          } 
        }
      })     
      this.miplaca2.emit(this.placa);
    }
  }
            
        

  
  
  ngOnInit() {
  }

}
