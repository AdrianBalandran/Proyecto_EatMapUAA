import { Routes } from '@angular/router';
import { PantallainicioComponent } from './pantallainicio/pantallainicio.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la raíz a /home
  { path: 'home', component: PantallainicioComponent }, // Ruta /home
  { path: 'login', component: LoginComponent },         // Ruta /login
  { path: 'logout', component: LogoutComponent },         // Ruta /logout
  { path: '**', redirectTo: '/home' }                  // Ruta para páginas no encontradas
];


