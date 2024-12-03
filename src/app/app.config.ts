import { ApplicationConfig } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), RouterModule, provideClientHydration(), HttpClient, provideHttpClient(), FormsModule, ReactiveFormsModule]
};
