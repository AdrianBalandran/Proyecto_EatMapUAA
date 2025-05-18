import { ApplicationConfig } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), RouterModule, CommonModule, provideClientHydration(), HttpClient, provideHttpClient(withFetch()), FormsModule, ReactiveFormsModule]
};
