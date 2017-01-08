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
placa:Placa[]=[];
  constructor(private apiRest: ApiRestService, private apiRepuestosService:apiRepuestosService) { }


  getPlaca(miplaca:any){
localStorage.removeItem('placa');




    console.log('placa');
    console.log(miplaca);
    if(miplaca.length == 7){
      this.apiRepuestosService.getPlaca(miplaca).subscribe((placa:any) =>{
      console.log(placa);
      this.placa=placa;
        if(this.placa){console.log('SIIII');
      localStorage.setItem('placa', JSON.stringify(this.placa));}else{  console.log('NOOOO');
        console.log('plate');
        console.log(placa);
          if (placa == null) {
             this.apiRest.getCarPlate(miplaca).subscribe((data:any) => {
            console.log('data');
            placa=data;
            if(data){localStorage.setItem('placa', JSON.stringify(data));}
              this.apiRepuestosService.addPlaca(placa)
                .subscribe(miperfil => {
                this.placa.push(placa );
                console.log(this.placa);
                
                });
           
            });
          }else{}
        }


      })     
    }
  }
            
        

  
  
  ngOnInit() {
  }

}
