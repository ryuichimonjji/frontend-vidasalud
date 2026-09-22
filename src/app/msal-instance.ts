import { PublicClientApplication, BrowserCacheLocation } from '@azure/msal-browser';
import { azureConfig } from './auth-config';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: azureConfig.clientId,
    authority: `https://login.microsoftonline.com/${azureConfig.tenantId}`,
    redirectUri: '/',
    postLogoutRedirectUri: '/',
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
  },
});