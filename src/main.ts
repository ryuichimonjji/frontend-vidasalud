import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { msalInstance } from './app/msal-instance';

msalInstance.initialize()
  .then(() => msalInstance.handleRedirectPromise())
  .then((result) => {
    console.log('handleRedirectPromise resultado:', result);
    if (result?.account) {
      msalInstance.setActiveAccount(result.account);
    }
    return bootstrapApplication(App, appConfig);
  })
  .catch((err) => console.error('Error en inicializacion de MSAL:', err));