import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, BrowserXhr } from '@angular/http';

import {CustExtBrowserXhr} from './cust-ext-browser-xhr';

import { AUTH_PROVIDERS }      from 'angular2-jwt';
import { ApiRestService }      from './services/api-rest.service';

//bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//google maps
import { AgmCoreModule } from 'angular2-google-maps/core';
//Snap.svg
//import { snapsvg } from '@types/snapsvg';

//RUTAS
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { PromotionsBrandsComponent } from './promotions-brands/promotions-brands.component';
import { LogoComponent } from './logo/logo.component';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { SearchPlateComponent } from './search-plate/search-plate.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WelcomeComponent,
    HomeComponent,
    PageNotFoundComponent,
    AuthComponent,
    ContactUsComponent,
    PromotionsComponent,
    PromotionsBrandsComponent,
    LogoComponent,
    ContactUsFormComponent,
    SearchPlateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpfFwJ-TiQ6DLgINZ16AojmrnqEa9BumI'
    })
  ],
  providers: [
    AUTH_PROVIDERS,
    ApiRestService,
    {provide:BrowserXhr,useClass:CustExtBrowserXhr}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
//provide(BrowserXhr,{useClass:CustExtBrowserXhr})