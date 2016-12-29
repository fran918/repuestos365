import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../services/api-rest.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search-plate',
  templateUrl: './search-plate.component.html',
  styleUrls: ['./search-plate.component.scss'],
  providers:[ApiRestService]
})
export class SearchPlateComponent implements OnInit {

  constructor(private apiRest: ApiRestService) { }

  ngOnInit() {
  }

  getCarPlate(plate){
    console.log('plate');
    console.log(plate);
    if (plate) {
      this.apiRest.getCarPlate(plate)
      .subscribe((data:any) => {
        console.log('data');
        console.log(data);
      });
    }
  }
  
  

}
