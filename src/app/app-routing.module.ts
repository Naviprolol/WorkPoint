import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-webpage/main-page/main-page.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings/profile-settings.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AddCoworkingComponent } from './components/add-coworking/add-coworking.component';
import { CoworkingItemComponent } from './components/main-webpage/coworking-item/coworking-item.component';
import { FavouritesPageComponent } from './components/favourites-page/favourites-page.component';
import { PlaceSettingsComponent } from './components/place-settings/place-settings.component';
import { AdBusinessComponent } from './components/ad-business/ad-business.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileSettingsComponent }, // canActivate: [AuthGuard]
  { path: 'main/add', canActivate: [AuthGuard], component: AddCoworkingComponent },
  { path: 'main/:id', canActivate: [AuthGuard], component: CoworkingItemComponent }, // coworking item
  { path: 'main/add/:id', canActivate: [AuthGuard], component: AddCoworkingComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'favourites', canActivate: [AuthGuard], component: FavouritesPageComponent },
  { path: 'place-settings', canActivate: [AuthGuard], component: PlaceSettingsComponent },
  { path: 'ad-business', canActivate: [AuthGuard], component: AdBusinessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
