import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './login/login.component';
import { AppointmentsComponent } from './appointments/appointments.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [MsalGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];