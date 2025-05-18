import { ApplicationConfig } from '@angular/core';
import { provideRouter, RouterModule, withHashLocation } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, withHashLocation()), RouterModule, CommonModule, provideClientHydration(), HttpClient, provideHttpClient(), FormsModule, ReactiveFormsModule]
};
