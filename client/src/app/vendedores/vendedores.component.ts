import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { VendedoresService } from '../services/vendedores.service';
import { apiPerfilService } from '../services/api-perfil.service';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.scss'],
  providers:[VendedoresService, apiPerfilService]
})
export class VendedoresComponent implements OnInit {
vendedores:any;
  constructor(private VendedoresService: VendedoresService, private apiPerfilService:apiPerfilService) { 
    this.VendedoresService.getVendedores().subscribe(vendedores =>{
    //   console.log(vendedores);
        this.vendedores=vendedores;
          
    });

  }
  vend:any;
ver(valor){
  this.apiPerfilService.getVendedor(valor).subscribe(perfil =>{
           // console.log(perfil);
            this.vend=perfil;
            }) 
}
deleteTienda(id:any){
            var vendedores = this.vendedores;
            this.VendedoresService.deleteVendedor(id).subscribe(data => {
              if(data.n == 1){
                for(var i =0; i< vendedores.length;i++){
                  if(vendedores[i]._id == id){
                    vendedores.splice(i, 1);
                  }
                }
              }
            })
            
        }
  ngOnInit() {
  }
  ngAfterViewInit() { }
}
