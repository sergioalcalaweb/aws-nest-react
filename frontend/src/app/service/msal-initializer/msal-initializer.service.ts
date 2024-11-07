import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { PublicClientApplication } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root',
})
export class MsalInitializerService {
  private msalInstance!: PublicClientApplication;
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  initialize() {
    if (isPlatformBrowser(this.platformId)) {
      this.msalInstance = new PublicClientApplication({
        auth: {
          clientId: '5fb0228e-397d-41f0-894f-7cfb2ebf74e1',
          authority:
            'https://login.microsoftonline.com/deb3d2f9-c8a3-468e-8e75-2c18665838a3',
          redirectUri: 'http://localhost:4200',
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: false,
        },
      });
    }
  }

  getInstance(): PublicClientApplication {
    if (!this.msalInstance) {
      throw new Error(
        'MSAL instance not initialized. Call initialize() first.'
      );
    }
    return this.msalInstance;
  }
}
