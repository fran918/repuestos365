import { Component, OnInit } from '@angular/core';
import {brandConfig} from './brandConfig';

@Component({
  selector: 'app-promotions-brands',
  templateUrl: './promotions-brands.component.html',
  styleUrls: ['./promotions-brands.component.scss']
})
export class PromotionsBrandsComponent implements OnInit {
  imgPromoUrl = 'dist/assets/promotions/promo.jpg';
  brandImages:any = brandConfig;
  constructor() { }

  ngOnInit() {
  }

}
