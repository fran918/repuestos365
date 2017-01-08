import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VendedoresService {
        host:string;

  constructor(private http:Http) {
        //   console.log("API VENDEDORES INICIALIZADO");
           this.host='http://localhost:8080/'; }

        getVendedores(){
           return this.http.get(this.host+'api/vendedores/')
                   .map(res => res.json());
        }
        getMarcas(){
           return this.http.get(this.host+'api/fpmarcas/')
                   .map(res => res.json());
        }
        getVendedor(id){
           return this.http.get(this.host+'api/vendedor/'+id)
                   .map(res => res.json());
        }
        getPedidosRefresh(id){
           return this.http.get(this.host+'api/pedidosref/'+id)
                   .map(res => res.json());
        }
        getPedidos(){
           return this.http.get(this.host+'api/pedidos/')
                   .map(res => res.json());
        }
        deleteVendedor(id:any){
            return this.http.delete(this.host+'api/deleteTienda/'+id)
            .map(res => res.json());
        }
        getPedidosCot(id:any){
           return this.http.get(this.host+'api/getPedidosCot/'+id)
                   .map(res => res.json());
        }
}
