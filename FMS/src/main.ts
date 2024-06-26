// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this module
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app/routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideAuth0({
      domain: 'dev-qemisnr832dfdbg6.us.auth0.com',
      clientId: '5IRcm4DfPrZWdDx9hEPk1X9o98LSuo8g',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
});
