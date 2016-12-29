import { Component, OnInit } from '@angular/core';

import { ApiRestService } from '../services/api-rest.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  mapConfi = {
    title: 'My first angular2-google-maps project',
    lat:-0.184534,
    lng: -78.468316,
    zoom: 14,
    zoomControl: 'disenabled',
    styles: 'HYBRID'
  }
  title: string = 'My first angular2-google-maps project';
  lat: number = -0.184534;
  lng: number = -78.468316;
  constructor( private apiRest: ApiRestService ) { }

  ngOnInit() {
  }
  sendEmail(email){

  }

}
