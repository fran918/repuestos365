import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FormplacaService {
host:string;
constructor(private http:Http){
        //   console.log("API FORM PLACA INICIALIZADO");
           this.host='http://localhost:8080/';
        }
addPlaca(newItem:any){
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
        return this.http.post(this.host+'api/addplaca',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }
getCombustible(){
           return this.http.get(this.host+'api/fpcombustible')
                   .map(res => res.json());
        }
getMarcas(){
           return this.http.get(this.host+'api/fpmarcas')
                   .map(res => res.json());
        }
getTracciones(){
           return this.http.get(this.host+'api/fptracciones')
                   .map(res => res.json());
        }
getTransmisiones(){
           return this.http.get(this.host+'api/fptransmisiones')
                   .map(res => res.json());
        }
}
