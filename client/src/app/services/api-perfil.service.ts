import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
    export class apiPerfilService{
constructor(private http:Http){
           console.log("API PERFIL INICIALIZADO");
        }
        getPerfil(id:any){
           return this.http.get('http://localhost:8080/api/perfil/'+id)
                   .map(res => res.json());
        }
        

    }



