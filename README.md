# VidaSalud — Frontend (Angular + MSAL)

Frontend Angular del sistema VidaSalud. Implementa autenticación con Azure AD (MSAL) usando el flujo Authorization Code + PKCE, y consume el backend a través de AWS API Gateway.

## Stack
- Angular (standalone components)
- @azure/msal-angular / @azure/msal-browser

## Cómo levantarlo localmente

\`\`\`bash
npm install
ng serve
\`\`\`

La app queda disponible en `http://localhost:4200`.

## Configuración

Editar `src/app/auth-config.ts` con los datos de tu App Registration en Azure AD:

\`\`\`typescript
export const azureConfig = {
  clientId: '<tu-client-id>',
  tenantId: '<tu-tenant-id>',
  apiScope: 'api://<tu-client-id>/access_as_user',
  apiUrl: '<url-del-api-gateway-o-bff>',
};
\`\`\`

## Rutas principales

- `/login` — login con Microsoft
- `/appointments` — listado de atenciones (protegida con `MsalGuard`, requiere rol Admin/Operador/Cliente)
