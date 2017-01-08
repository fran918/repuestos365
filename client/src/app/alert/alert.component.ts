import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { VendedoresService } from '../services/vendedores.service';
import {Router} from '@angular/router'
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  providers:[ VendedoresService]
})
export class AlertComponent implements OnInit {

  tick=0;
mostrar:boolean=false;
NewPedidos:any;profile:any;perfil:any;
  constructor(private VendedoresService: VendedoresService,
    private router: Router) {
      this.profile = JSON.parse(localStorage.getItem('profile'));
      this.VendedoresService.getVendedor(this.profile.email).subscribe(perfil =>{
           // console.log(perfil);
            this.perfil=perfil;
          // console.log(this.perfil); 
         //  console.log(this.perfil.marcas);
            })

 
   }
muestra(){
  this.mostrar=false;
}
ver(){
        this.router.navigate(['pedidos']);
}
timestamp:any;
clic(valor){
    this.tick=valor;
    //console.log(valor);
let ts=JSON.parse(localStorage.getItem('pedido_id'));
//console.log(this.perfil.marcas.length);


    // Convert string date to Date object (otherwise assume timestamp is a date)
        this.timestamp = new Date(this.timestamp);
    

    // Convert date object to hex seconds since Unix epoch
    var hexSeconds = Math.floor(this.timestamp/1000).toString(16);

    // Create an ObjectId with that hex timestamp
    //var constructedObjectId = ObjectId(hexSeconds + "0000000000000000");

    //console.log(hexSeconds);


    //console.log(ts);



this.VendedoresService.getPedidosRefresh(ts).subscribe(pedidos =>{
  let long=pedidos.length;
let pedido2:any;let long2:any=0;
  let longarray=pedidos.length-1;
  if(long >= 1){pedido2=[];
     for(var j =0; j< long;j++){
          for(var i =0; i< this.perfil.marcas.length;i++){
                  if(pedidos[j].marca == this.perfil.marcas[i]){
                 //   console.log('SIII');
                    pedido2.unshift(pedidos[j]);
              }else{//console.log('NOOO');
                  }
                  
          }
        }
long2=pedido2.length;
//console.log(pedidos[longarray].id_carrito);
    localStorage.setItem('pedido_id', pedidos[longarray].id_carrito);
  }

  //console.log(pedido2[long2-1].id_carrito);
  if(long2 >= 1){
  this.NewPedidos=long2;
  this.mostrar=true;}
    });  





  }
  ngOnInit() {
let timer = Observable.timer(6000,6000);
    
    timer.subscribe(t=>this.clic(t) );

  }
  ngAfterViewInit() { }
}
