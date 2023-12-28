import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-webpage/main-page/main-page.component';
import { CoworkingsListComponent } from './components/main-webpage/coworkings-list/coworkings-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { BannerComponent } from './components/main-webpage/banner/banner.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FilterComponent } from './components/main-webpage/filter/filter.component';
import { FindCoworkingPipe } from './pipes/find-coworking.pipe';
import { FilterCoworkingPipe } from './pipes/filter-coworking.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings/profile-settings.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { AddCoworkingComponent } from './components/add-coworking/add-coworking.component';
import { CoworkingItemComponent } from './components/main-webpage/coworking-item/coworking-item.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FavouritesPageComponent } from './components/favourites-page/favourites-page.component';
import { CommonModule } from '@angular/common'
import { PlaceSettingsComponent } from './components/place-settings/place-settings.component';
import { AdBusinessComponent } from './components/ad-business/ad-business.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { TuiRootModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiCarouselModule, TuiIslandModule, TuiPaginationModule } from '@taiga-ui/kit';

import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { AllApplicationsComponent } from './components/ad-business/all-applications/all-applications.component';
import { AdminMainPageComponent } from './components/admin/admin-main-page/admin-main-page.component';
import { RequestsToAddComponent } from './components/admin/requests-to-add/requests-to-add.component';
import { RequestComponent } from './components/admin/requests-to-add/request/request.component';
import { RequestsToAppComponent } from './components/admin/requests-to-app/requests-to-app.component';
import { AdPlacesComponent } from './components/ad-business/places/places.component';
import { AppRequestComponent } from './components/admin/requests-to-app/app-request/app-request.component';
import { AdminBannersComponent } from './components/admin/admin-banners/admin-banners.component';
import { AdminRoleComponent } from './components/admin/admin-role/admin-role.component';

const mapConfig: YaConfig = {
  apikey: '4d882b8c-882e-4fd7-8097-d924a789563f',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CoworkingsListComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    FilterComponent,
    FindCoworkingPipe,
    FilterCoworkingPipe,
    ProfileSettingsComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    AddCoworkingComponent,
    CoworkingItemComponent,
    FavouritesPageComponent,
    PlaceSettingsComponent,
    AdBusinessComponent,
    AllApplicationsComponent,
    AdminMainPageComponent,
    RequestsToAddComponent,
    RequestComponent,
    RequestsToAppComponent,
    AdPlacesComponent,
    AppRequestComponent,
    AdminBannersComponent,
    AdminRoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStarRatingModule,
    CommonModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiPaginationModule,
    TuiButtonModule,
    AngularYandexMapsModule.forRoot(mapConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
