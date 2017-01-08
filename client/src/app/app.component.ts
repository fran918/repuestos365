import { Component , Input , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss','./app.component.css']
})
export class AppComponent {
  
  placa:any;
  mi_placa:any=this.placa;
   miplaca(valor){
    this.placa=valor;
    console.log('appcomponent'+this.placa);
  }
}
