import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
    export class apiPerfilService{
        host:string;
constructor(private http:Http){
         //  console.log("API PERFIL INICIALIZADO");
           this.host='http://localhost:8080/';
        }
        getPerfil(id:any){
           return this.http.get(this.host+'api/perfil/'+id)
                   .map(res => res.json());
        }
        getCheckVendedor(email:any){
           return this.http.get(this.host+'api/checkV/'+email)
                   .map(res => res.json());
        }
        getVendedor(id:any){
           return this.http.get(this.host+'api/vendedor/'+id)
                   .map(res => res.json());
        }
        
        updatePerfil(perfil:any){
        //    console.log(perfil);
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
        return this.http.put(this.host+'api/editperfil/'+perfil,JSON.stringify(perfil),{headers:headers})
        .map(res => res.json());
        }
        addPerfil(newItem:any){
           // console.log(newItem);
            var headers = new Headers();
            //headers.append('Access-Control-Allow-Origin', 'application/json');
            headers.append('Content-Type', 'application/json');
        return this.http.post(this.host+'api/saveperfil',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }
        addVendedor(newItem:any){
            //console.log(newItem);
            var headers = new Headers();
            //headers.append('Access-Control-Allow-Origin', 'application/json');
            headers.append('Content-Type', 'application/json');
        return this.http.post(this.host+'api/addvendedor',JSON.stringify(newItem),{headers:headers})
        .map(res => res.json());
        }
    }



