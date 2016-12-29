import { Component, OnInit } from '@angular/core';

import { EmailModel } from './email.model';

import { ApiRestService } from '../services/api-rest.service';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent implements OnInit {
  emailModel = new EmailModel("","","","","");
  constructor(private apiRest: ApiRestService) { }

  ngOnInit() {
  }

  sendEmail(data){
    let emailConfig = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      phone: data.phone,
      message: data.message
    }
    console.log(emailConfig);
    this.apiRest.sendEmail(emailConfig);
  }

}
