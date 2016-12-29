import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Email } from '../model/email.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiRestService {
  //private baseUrl: string = 'http://localhost:8080'; 
 private baseUrl: string = 'http://nodejs-mongo-persistent-rep-365.44fs.preview.openshiftapps.com/';
  constructor(private http: Http) { }
  //: Observable<Email[]>

  sendEmail(body: any) {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request options
    console.log('body');
    console.log(body);
    console.log('options');
    console.log(options);

    return this.http.post(this.baseUrl+'/api/send-email-contactus', body, options)
    .subscribe((data:any) => {
      console.log('data');
      console.log(data);
      alert('Enviado con Exito');
    });
  }
/*
getCarPlate3(carPlate) {
    return Observable.forkJoin(
      this.http.get('http://www.informaciondetallada.com/busqueda/rest/placa/JBE0131').map((res:Response) => res.json())
    );
  }*/

getCarPlate(carPlate): Observable <any>{
  return this.http.get('http://www.informaciondetallada.com/busqueda/rest/placa/JBE0131')
  .map(response => response.json());}
  /*
  getCarPlate(carPlate) : Observable<any> {
const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
let options = new RequestOptions({ headers: headers });
         // ...using get request
         return this.http.get('https://jsonplaceholder.typicode.com/posts',options)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error!!!'));

}*/
/*
  getCarPlate(carPlate): Observable<any> {
    let apiUrl = 'http://www.informaciondetallada.com/busqueda/rest/placa/'
    // Tried adding headers with no luck
    const headers = new Headers();
    //headers.append('Access-Control-Allow-Headers', 'Content-Type');
    //headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
let options = new RequestOptions({ headers: headers });
    return this.http.get('https://crossorigin.me/https://finance.yahoo.com/d/quotes.csv?s=AAPL&f=np',options)
    .map(response => response.json());
  }


getCarPlate2(carPlate) {
    var url = "http://finance.yahoo.com/d/quotes.csv?s=AAPL&f=np";
    let headers = new Headers({ 'Access-Control-Allow-Origin': '*'});
    let options = new RequestOptions({ headers: headers });
    this.http.get(url, options).map(response => response.json());
}

  getCarPlate4(carPlate) {
const headers = new Headers();
    //headers.append('Access-Control-Allow-Headers', 'Content-Type');
    //headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    
    var url = "https://crossorigin.me/http://www.informaciondetallada.com/busqueda/rest/placa/JBE0131";
  this.http.get(url,{headers}).toPromise().then(function(response){
        console.log(response);
    });     
  }*/
}
