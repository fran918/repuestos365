import { Component, OnInit } from '@angular/core';
import {brandConfig} from './brandConfig';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  promoImgUrl = 'dist/assets/promotions/promo.jpg';
  brandImages:any = brandConfig;
  constructor() { }

  ngOnInit() {
  }

}
