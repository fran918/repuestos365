import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PromotionsBrandsComponent } from './promotions-brands/promotions-brands.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { EditperfilComponent } from './editperfil/editperfil.component';


export const routes: Routes = [
  { path: '',       component: WelcomeComponent },
  { path: 'welcome',   component: WelcomeComponent },
  { path: 'home',   component: HomeComponent },
  { path: 'perfil',     component: PerfilComponent },
  { path: 'cotizaciones',     component: CotizacionesComponent },
  { path: 'contact-us',   component: ContactUsComponent },
  { path: 'edit-perfil',   component: EditperfilComponent },
  { path: 'promotions-brands',   component: PromotionsBrandsComponent },
  { path: 'promotions',   component: PromotionsComponent },
  { path: '**',     component: PageNotFoundComponent }, 
];