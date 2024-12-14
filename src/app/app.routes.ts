import { Routes } from '@angular/router';
import { PantallainicioComponent } from './pantallainicio/pantallainicio.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { VistaproductosComponent } from './vistaproductos/vistaproductos.component';
import { MapalocComponent } from './mapaloc/mapaloc.component';
import { VistainfoComponent } from './vistainfo/vistainfo.component';
import { UsuariopagComponent } from './usuariopag/usuariopag.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { CambiarusuariosComponent } from './cambiarusuarios/cambiarusuarios.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la raíz a /home
  { path: 'home', component: PantallainicioComponent }, // Ruta /home
  { path: 'login', component: LoginComponent },         // Ruta /login
  { path: 'logout', component: LogoutComponent },      // Ruta /logout
  { path: 'vistaprod', component: VistaproductosComponent },     // Ruta /vistaprod 
  { path: 'mapa', component: MapalocComponent },     // Ruta /mapaloc
  { path: 'usuario', component: UsuariopagComponent },     // Ruta /usuario
  { path: 'pedidos', component: PedidosComponent },     // Ruta /pedidos
  { path: 'cambiar', component: CambiarusuariosComponent },     // Ruta /pedidos
  { path: 'vista/:id', component: VistainfoComponent}, 
  { path: '**', redirectTo: '/home' }                  // Ruta para páginas no encontradas
];


