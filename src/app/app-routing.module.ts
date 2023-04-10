import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-webpage/main-page/main-page.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings/profile-settings.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AuthGuard } from './shared/classes/auth.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileSettingsComponent },
  { path: 'registration', component: RegistrationPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
