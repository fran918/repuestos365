import { Component, OnInit ,Input,DoCheck, OnChanges, SimpleChanges} from '@angular/core';
import { apiRepuestosService } from '../services/api-repuestos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ apiRepuestosService]
})
export class HomeComponent implements OnChanges, DoCheck {
@Input() placa:string ='default';

title:string;
auto:any= new Object() ;
  constructor(
    private apiRepuestosService:apiRepuestosService
  ) { console.log(this.placa);
    this.auto = JSON.parse(localStorage.getItem('placa'));

    /*
this.auto.marca="KIA";
this.auto.modelo="SPORTAGE L";
this.auto.anio="2010";
this.auto.color="ROJO";
this.auto.clase="JEEP";
this.auto.servicio="PARTICULAR";
this.auto.aniom="2014";
this.auto.fecham="24-02-2014";
this.auto.fechac="31-12-2014";*/
console.log(this.auto);
this.auto=apiRepuestosService.getmiPlaca();


  }



  ngOnChanges(changes: SimpleChanges){
console.log(changes);
  }
  ngDoCheck(){
if(this.apiRepuestosService.getmiPlaca()){this.auto=this.apiRepuestosService.getmiPlaca();}

  }
  

}
