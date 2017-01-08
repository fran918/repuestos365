import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Email } from '../model/email.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiRestService {
  private baseUrl: string = 'http://localhost:8080'; 
  //private baseUrl: string = 'http://nodejs-mongo-persistent-rep-365.44fs.preview.openshiftapps.com';
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

  getCarPlate(carPlate): Observable<any> {
    let apiUrl = 'http://www.informaciondetallada.com/busqueda/rest/placa/'
    // Tried adding headers with no luck
    //const headers = new Headers();
    //headers.append('Access-Control-Allow-Headers', 'Content-Type');
    //headers.append('Access-Control-Allow-Methods', 'GET');
    //headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(apiUrl + carPlate)
    //return this.http.get('http://localhost:8080/api/muestra')
    .map(response => response.json());
  }

}
