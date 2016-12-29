import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PromotionsBrandsComponent } from './promotions-brands/promotions-brands.component';
import { PromotionsComponent } from './promotions/promotions.component';

export const routes: Routes = [
  { path: '',       component: WelcomeComponent },
  { path: 'welcome',   component: WelcomeComponent },
  { path: 'home',   component: HomeComponent },
  { path: 'contact-us',   component: ContactUsComponent },
  { path: 'promotions-brands',   component: PromotionsBrandsComponent },
  { path: 'promotions',   component: PromotionsComponent },
  { path: '**',     component: PageNotFoundComponent }, 
];