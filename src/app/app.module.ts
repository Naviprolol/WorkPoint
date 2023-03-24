import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-webpage/main-page/main-page.component';
import { CoworkingsListComponent } from './components/main-webpage/coworkings-list/coworkings-list.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { BannerComponent } from './components/main-webpage/banner/banner.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FilterComponent } from './components/main-webpage/filter/filter.component';

const appRoutes: Routes = [   //Маршрутизация !
  { path: '', component: MainPageComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CoworkingsListComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
