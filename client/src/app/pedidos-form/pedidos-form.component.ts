import { Component, OnInit, Output,EventEmitter, Input, DoCheck ,AfterViewInit} from '@angular/core';
import { apiRepuestosService } from '../services/api-repuestos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css'],
  providers:[ AuthService,apiRepuestosService]
})
export class PedidosFormComponent implements OnInit , DoCheck{
    @Input() idd:any;
     @Input() id2:any;
  @Input() submit:any;
  id3:any;cant:any=[];
total:any;profile:any;pedido:any;valor:any;tipo;any;
pedido2:any=[];cantidad:any;image:any;s:any;
form:any= [1];id:any;

  constructor(private AuthService:AuthService,
              private apiRepuestosService: apiRepuestosService) { 
                
                this.profile = JSON.parse(localStorage.getItem('profile'));
   
    for(var i=0;i<this.total;i++){
      this.form.push('1');
    }
    

  }


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
 // console.log(this.image);
}

vers:any;
ver_pedido2(repuestow){
  this.vers=[];
 // console.log(repuestow);
  this.vers=repuestow;
          }  

addPedido2(){ 
  var newPedido={
    "carrito":this.vers._id,
    "id_carrito":this.vers.id_carrito,
    "repuesto":this.vers.repuesto,
    "cantidad":this.cantidad,
    "imagen":this.image,
   "valor":this.valor,
   "tipo":this.tipo,
    "user":this.profile.identities[0].user_id
    
  }
  
  //console.log(newPedido);
  if((newPedido.carrito)&&(newPedido.cantidad)&&(newPedido.valor)&&(newPedido.tipo)&&(newPedido.user)&&(newPedido.repuesto)&&(newPedido.id_carrito)){
  this.apiRepuestosService.addItemVend(newPedido)
      .subscribe(mipedido => {
      this.pedido2.push(mipedido);
      
      });
    
  }
}

  ngOnInit() {
     this.id=this.idd;
     this.id3=this.id2;
    this.ver_pedido2(this.id);
  }
  ngDoCheck(){
this.cant = JSON.parse(localStorage.getItem('task'));
//console.log(this.cant);
this.cant[this.id3]=this.valor;
//console.log(this.cant);
   localStorage.setItem('task', JSON.stringify(this.cant));
  
if(this.submit == true){
  this.addPedido2();
 //console.log(this.submit);
  this.submit=false;
}else{//console.log(this.submit);
}
  }
    ngAfterViewInit() { }
}
