import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
    export class apiRepuestosService{
constructor(private http:Http){
           console.log("API REPUESTOS INICIALIZADO");
        }
getRepuestos(){
           return this.http.get('http://localhost:8080/api/repuestos')
                   .map(res => res.json());
        }
   
addRepuesto(newItem:any){
            console.log(newItem);
            var headers = new Headers();
            headers.append('Access-Control-Allow-Origin', 'application/json');
        return this.http.post('http://localhost:8080/api/addrepuestocarrito',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }
addPedido(newItem:any){
            console.log(newItem);
            var headers = new Headers();
            //headers.append('Access-Control-Allow-Origin', 'application/json');
            headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/api/addrepuestocarrito',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }
getPlaca(placa){
    console.log(placa);
           return this.http.get('http://localhost:8080/api/placa/'+placa)
                   .map(res => res.json());
        }



 }


