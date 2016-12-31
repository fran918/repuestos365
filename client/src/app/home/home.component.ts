import { Component, OnInit ,Input} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
@Input() placa:string ='default';

title:string;
auto:any= new Object() ;
  constructor(
    
  ) { console.log(this.placa);
    
this.auto.marca="KIA";
this.auto.modelo="SPORTAGE L";
this.auto.anio="2010";
this.auto.color="ROJO";
this.auto.clase="JEEP";
this.auto.servicio="PARTICULAR";
this.auto.aniom="2014";
this.auto.fecham="24-02-2014";
this.auto.fechac="31-12-2014";
console.log(this.auto);



  }



  ngOnInit() {
  }

}
