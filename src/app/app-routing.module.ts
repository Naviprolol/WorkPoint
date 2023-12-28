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
import { AllApplicationsComponent } from './components/ad-business/all-applications/all-applications.component';
import { AdminMainPageComponent } from './components/admin/admin-main-page/admin-main-page.component';
import { RequestsToAddComponent } from './components/admin/requests-to-add/requests-to-add.component';
import { RequestComponent } from './components/admin/requests-to-add/request/request.component';
import { AdminGuard } from './shared/classes/admin.guard';
import { RequestsToAppComponent } from './components/admin/requests-to-app/requests-to-app.component';
import { AdPlacesComponent } from './components/ad-business/places/places.component';
import { AppRequestComponent } from './components/admin/requests-to-app/app-request/app-request.component';
import { AdminBannersComponent } from './components/admin/admin-banners/admin-banners.component';
import { AdminRoleComponent } from './components/admin/admin-role/admin-role.component';

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
  { path: 'ad-business/places', canActivate: [AuthGuard], component: AdPlacesComponent },
  { path: 'ad-business/places/:id', canActivate: [AuthGuard], component: AdBusinessComponent },
  { path: 'ad-business/applications', canActivate: [AuthGuard], component: AllApplicationsComponent },
  { path: 'admin/main', canActivate: [AuthGuard, AdminGuard], component: AdminMainPageComponent },
  { path: 'admin/requests-to-add', canActivate: [AuthGuard, AdminGuard], component: RequestsToAddComponent },
  { path: 'admin/requests-to-add/request/:id', canActivate: [AuthGuard, AdminGuard], component: RequestComponent },
  { path: 'admin/requests-to-app', canActivate: [AuthGuard, AdminGuard], component: RequestsToAppComponent },
  { path: 'admin/requests-to-app/request/:id', canActivate: [AuthGuard, AdminGuard], component: AppRequestComponent },
  { path: 'admin/banners', canActivate: [AuthGuard, AdminGuard], component: AdminBannersComponent },
  { path: 'admin/roles', canActivate: [AuthGuard, AdminGuard], component: AdminRoleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
