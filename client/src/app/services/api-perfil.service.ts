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
        getVendedor(id:any){
           return this.http.get('http://localhost:8080/api/vendedor/'+id)
                   .map(res => res.json());
        }
        
        updatePerfil(perfil:any){
           // console.log(perfil);
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:8080/api/editperfil/'+perfil.user_idTK,JSON.stringify(perfil),{headers:headers})
        .map(res => res.json());
        }
        addPerfil(newItem:any){
           // console.log(newItem);
            var headers = new Headers();
            //headers.append('Access-Control-Allow-Origin', 'application/json');
            headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/api/saveperfil',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }
        addVendedor(newItem:any){
            //console.log(newItem);
            var headers = new Headers();
            //headers.append('Access-Control-Allow-Origin', 'application/json');
            headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/api/addvendedor',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }
    }



