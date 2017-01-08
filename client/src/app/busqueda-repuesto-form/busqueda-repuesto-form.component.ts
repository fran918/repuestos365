import { Component, OnInit ,Input, DoCheck,AfterViewInit} from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from '../services/auth.service';
import { apiRepuestosService } from '../services/api-repuestos.service';
import { Pedido } from '../busqueda-repuesto/Pedido';

@Component({
  selector: 'app-busqueda-repuesto-form',
  templateUrl: './busqueda-repuesto-form.component.html',
  styleUrls: ['./busqueda-repuesto-form.component.css'],
  providers:[AuthService, apiRepuestosService]
})
export class BusquedaRepuestoFormComponent implements DoCheck, OnInit {
  @Input() id:string;
  @Input() submit:any;
profile:any;

repuesto:string;
pedido:Pedido[]=[];
cantidad:number=1;
auto:any= new Object() ;
img:any;
rep:any={image:'',repuesto:'',cantidad:''}
  constructor(private router: Router,
              private AuthService:AuthService,
              private apiRepuestosService: apiRepuestosService) { 
        //   console.log(this.id);
              this.profile = JSON.parse(localStorage.getItem('profile'));
              this.id=this.id;
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
            this.rep.image = dataurl;
        }
        
        // Load files into file reader
    reader.readAsDataURL(file);








  //------
 // var myReader:FileReader = new FileReader();

 // myReader.onloadend = (e) => {
  //  this.rep.image = myReader.result;
    
  //}
  //myReader.readAsDataURL(file);
 // console.log(this.rep.image);
}


addPedido2(){
  var newPedido={
    "id_carrito":this.id,
    "repuesto":this.rep.repuesto,
    "cantidad":this.rep.cantidad,
    "auto":this.rep.auto,
    "imagen":this.rep.image,
    "user":this.profile.identities[0].user_id
    
  }
  
 // console.log(newPedido);
  if((this.rep.repuesto)&&(this.rep.cantidad)&&(this.profile.identities[0].user_id)){
  this.apiRepuestosService.addPedido(newPedido)
      .subscribe(mipedido => {
      this.pedido.push(mipedido);
     // console.log(this.pedido+'--------------');
      
     // this.router.navigate(['cotizaciones']);
      });
    
  }
}


  ngOnInit() {
  }
  ngDoCheck(){

if(this.submit == true){
  this.addPedido2();
 //console.log(this.submit);
  this.submit=false;
}else{//console.log(this.submit);
}


  }
    ngAfterViewInit() { }
}
