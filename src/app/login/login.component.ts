import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalService } from '@azure/msal-angular';
import { azureConfig } from '../auth-config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 2rem; font-family: sans-serif;">
      <h2>VidaSalud</h2>
      <button *ngIf="!isLoggedIn" (click)="login()">Iniciar sesion con Microsoft</button>
      <button *ngIf="isLoggedIn" (click)="logout()">Cerrar sesion</button>
    </div>
  `,
})
export class LoginComponent {
  private msalService = inject(MsalService);

  get isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() !== null;
  }

  login(): void {
    this.msalService.loginRedirect({ scopes: [azureConfig.apiScope] });
  }

  logout(): void {
    this.msalService.logoutRedirect();
  }
}