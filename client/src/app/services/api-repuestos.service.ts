import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
    export class apiRepuestosService{
host:string;
constructor(private http:Http){
        //   console.log("API REPUESTOS INICIALIZADO");
           this.host='http://localhost:8080/';
        }

getRepuestos(){
           return this.http.get(this.host+'api/repuestos')
                   .map(res => res.json());
        }
getRepuesto(id){
  //  console.log(id);
           return this.http.get(this.host+'api/repuesto/'+id)
                   .map(res => res.json());
        }
getMiPedido(id){
  //  console.log(id);
           return this.http.get(this.host+'api/pedido/'+id)
                   .map(res => res.json());
        }
getMisPedidos(id){
  //  console.log(id);
           return this.http.get(this.host+'api/pedidos/'+id)
                   .map(res => res.json());
        }
getItemPedidos(id){
  //  console.log(id);
           return this.http.get(this.host+'api/itemPedido/'+id)
                   .map(res => res.json());
        }
   /*
addRepuesto(newItem:any){
       //     console.log(newItem);
            var headers = new Headers();
            headers.append('Access-Control-Allow-Origin', 'application/json');
        return this.http.post(this.host+'api/addrepuestocarrito',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }*/
addPedido(newItem:any){
           // console.log(newItem);
            var headers = new Headers();
            //headers.append('Access-Control-Allow-Origin', 'application/json');
            headers.append('Content-Type', 'application/json');
        return this.http.post(this.host+'api/addpedidocarrito',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }
addItemVend(newItem:any){
           // console.log(newItem);
            var headers = new Headers();
            //headers.append('Access-Control-Allow-Origin', 'application/json');
            headers.append('Content-Type', 'application/json');
        return this.http.post(this.host+'api/additemvend',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }
addCompVend(newItem:any){
           // console.log(newItem);
            var headers = new Headers();
            //headers.append('Access-Control-Allow-Origin', 'application/json');
            headers.append('Content-Type', 'application/json');
        return this.http.post(this.host+'api/addCompVend',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }
addPedidoCompleto(newItem:any){
           // console.log(newItem);
            var headers = new Headers();
            //headers.append('Access-Control-Allow-Origin', 'application/json');
            headers.append('Content-Type', 'application/json');
        return this.http.post(this.host+'api/addrepuestocarrito',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }
getPedido(){
           return this.http.get(this.host+'api/repuestos')
                   .map(res => res.json());
        }
getPlaca(placa){
   // console.log(placa);
           return this.http.get(this.host+'api/placa/'+placa)
                   .map(res => res.json());
        }
addPlaca(newItem:any){
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
        return this.http.post(this.host+'api/addplaca',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }
getmiPlaca(){
   // console.log(placa);
           return JSON.parse(localStorage.getItem('placa'));
        }
getmiPlaca2(){
   // console.log(placa);
           return JSON.parse(localStorage.getItem('encontrar'));
        }
getmiPlaca3(){
   // console.log(placa);
           return JSON.parse(localStorage.getItem('encontrar-placa'));
        }
deletePedido(id:any){
            return this.http.delete('http://localhost:8080/api/deletePedido/'+id)
            .map(res => res.json());
        }

 }


