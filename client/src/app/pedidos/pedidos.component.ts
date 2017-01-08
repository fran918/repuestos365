import { Component, OnInit ,DoCheck,Input, AfterViewInit} from '@angular/core';
import { apiRepuestosService } from '../services/api-repuestos.service';
import { VendedoresService } from '../services/vendedores.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  providers:[ VendedoresService,apiRepuestosService]
})
export class PedidosComponent implements OnInit , DoCheck{
  ngAfterViewInit() {
       //Copy in all the js code from the script.js. Typescript will complain but it works just fine
    }
  precioTotal=0;
  verPrecio(valor:any){
    //console.log(valor);
  }
  pedido2:any=[];submit:boolean=false;mi_id:any;pedi:any;
pedidos:any;profile:any;perfil:any;
  constructor(private VendedoresService: VendedoresService,private router: Router,private apiRepuestosService:apiRepuestosService) { 
    this.profile = JSON.parse(localStorage.getItem('profile'));
    //console.log(this.profile.email);
this.mi_id=this.profile.identities[0].user_id;

    this.VendedoresService.getVendedor(this.profile.email).subscribe(perfil =>{
            //console.log(perfil);
            this.perfil=perfil;
           //console.log(this.perfil); 
           //console.log(this.perfil.marcas);
            })

    this.VendedoresService.getPedidos().subscribe(pedidos =>{
      this.pedido2=[];
        for(var j =0; j< pedidos.length;j++){this.pedi=pedidos[j];
          for(var i =0; i< this.perfil.marcas.length;i++){
           // console.log('MARCAS '+this.perfil.marcas[i]);
           // console.log('MARCAS '+pedidos[j].marca);
                  if(pedidos[j].marca == this.perfil.marcas[i]){//console.log(pedidos[j].id_carrito);
                    this.pedido2.unshift(pedidos[j]);
                  //    console.log(this.pedi);
                   /* this.VendedoresService.getPedidosCot(pedidos[j].id_carrito).subscribe(ped =>{
                    console.log(ped.length);
                    if(ped.length == 0){
                      console.log('++++++++')
                  }else{
                      console.log(this.pedi);
                      this.pedido2.push(this.pedi);
                      }
    });*/
                    
                    
              }else{
                  }
                  localStorage.setItem('pedido_id', pedidos[j].id_carrito);
          }
        }
this.pedidos=this.pedido2;//console.log(this.pedido2);

    });

/*
setInterval(() => { 
this.VendedoresService.getPedidosRefresh(JSON.parse(localStorage.getItem('pedido_id'))).subscribe(pedidos =>{
  let long=pedidos.length;
  let longarray=pedidos.length-1;
  if(long >= 1){localStorage.setItem('pedido_id', pedidos[longarray].id_carrito);}
  //console.log(pedidos[longarray].id_carrito);
    });  
 }, 5000);


*/





  }

image:any;
changeListener($event) : void {
 // console.log(this.rep);
  this.readThis($event.target);
}

readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
//--------

   // var filesToUpload = document.getElementById('imageFile').files;
    //var file = filesToUpload[0];

    // Create an image
    var img = document.createElement("img");
    // Create a file reader
    var reader = new FileReader();
    // Set the image once loaded into file reader
   // reader.onload = function(e:any) {
      reader.onloadend = (e:any) => {
            img.src = e.target.result;

            var canvas = document.createElement("canvas");
            //var canvas = $("<canvas>", {"id":"testing"})[0];
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            var MAX_WIDTH = 300;
            var MAX_HEIGHT = 300;
            var width = img.width;
            var height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            var dataurl = canvas.toDataURL("image/png");
		//	console.log(dataurl);
            this.image = dataurl;
        }
        
        // Load files into file reader
    reader.readAsDataURL(file);








  //------
 // var myReader:FileReader = new FileReader();

 // myReader.onloadend = (e) => {
  //  this.rep.image = myReader.result;
    
  //}
  //myReader.readAsDataURL(file);
  //console.log(this.image);
}




form:any= [];
addPedido(){
  this.submit=!this.submit;
  //console.log(this.submit);
  var newPedido={
    "id_carrito":this.verrepuestos[0].id_carrito,
    "user":this.profile.identities[0].user_id
  }
 this.apiRepuestosService.addCompVend(newPedido)
      .subscribe(mipedido => {
      this.form.push(mipedido);
      //console.log(this.form);
      this.router.navigate(['cotizaciones']);
      });

}


aux:any=new Array(4);
  pedido:any;verrepuestos:any;
  long:any;
ver_pedido(repuesto){
  this.aux=[];
  this.verrepuestos=[];
  //console.log(repuesto);
  this.pedido=repuesto;
  
  localStorage.setItem('task', JSON.stringify(this.aux));

            this.apiRepuestosService.getMiPedido(repuesto).subscribe(repuesto =>{
            this.verrepuestos=repuesto;
            
            })
          }  

longitud:any;
  ngOnInit() {

    
    
  }
  ngDoCheck(){
    this.aux = JSON.parse(localStorage.getItem('task'));
this.precioTotal=0;
if(this.aux){
this.longitud = this.aux.length;
for(var i = 0; i<this.longitud;i++){
this.precioTotal = this.aux[i]+this.precioTotal;
}
//console.log(this.precioTotal);
  }
}

}
