import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InteractionType } from '@azure/msal-browser';
import { MsalModule, MsalGuard, MsalInterceptor, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { routes } from './app.routes';
import { azureConfig } from './auth-config';
import { msalInstance } from './msal-instance';

const protectedResourceMap = new Map<string, Array<string>>();
protectedResourceMap.set(`${azureConfig.apiUrl}/*`, [azureConfig.apiScope]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      MsalModule.forRoot(
        msalInstance,
        { interactionType: InteractionType.Redirect, authRequest: { scopes: [azureConfig.apiScope] } },
        { interactionType: InteractionType.Redirect, protectedResourceMap }
      )
    ),
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
};