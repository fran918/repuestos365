import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ApiRestService } from '../services/api-rest.service';
import { AuthService } from '../services/auth.service';
import { apiRepuestosService } from '../services/api-repuestos.service';

@Component({
  selector: 'app-search-plate',
  templateUrl: './search-plate.component.html',
  styleUrls: ['./search-plate.component.scss'],
  providers:[ApiRestService, apiRepuestosService]
})
export class SearchPlateComponent implements OnInit {
placa:string;
  constructor(private apiRest: ApiRestService, private apiRepuestosService:apiRepuestosService) { }


             getPlaca(placa){
    console.log('placa');
    console.log(placa);
    if(placa.length == 7){
            this.apiRepuestosService.getPlaca(placa).subscribe(placa =>{
            console.log(placa);
            this.placa=placa;
            if(this.placa){console.log('SIIII');}else{
              
    console.log('plate');
    console.log(placa);
    if (placa) {
      this.apiRest.getCarPlate(placa).subscribe((data:any) => {
        console.log('data');
        this.placa=placa;
        console.log(data);
      });
    }
  
            
          
        
      }
            })
            
    }
          }
            
        

  
  
  
  ngOnInit() {
  }

}
