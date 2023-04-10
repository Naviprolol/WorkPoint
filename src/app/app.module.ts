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
import { FindCoworkingPipe } from './pipes/find-coworking.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings/profile-settings.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './shared/classes/token.interceptor';

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
    ProfileSettingsComponent,
    LoginPageComponent,
    RegistrationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
