import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaEditAdminRoutedComponent } from './componente/application/cuenta/routed/admin/cuenta-edit-admin-routed/cuenta-edit-admin-routed.component';
import { CuentaNewAdminRoutedComponent } from './componente/application/cuenta/routed/admin/cuenta-new-admin-routed/cuenta-new-admin-routed.component';
import { CuentaPlistAdminRoutedComponent } from './componente/application/cuenta/routed/admin/cuenta-plist-admin-routed/cuenta-plist-admin-routed.component';
import { CuentaRemoveAdminRoutedComponent } from './componente/application/cuenta/routed/admin/cuenta-remove-admin-routed/cuenta-remove-admin-routed.component';
import { CuentaViewAdminRoutedComponent } from './componente/application/cuenta/routed/admin/cuenta-view-admin-routed/cuenta-view-admin-routed.component';
import { OperacionEditAdminRoutedComponent } from './componente/application/operacion/routed/admin/operacion-edit-admin-routed/operacion-edit-admin-routed.component';
import { OperacionNewAdminRoutedComponent } from './componente/application/operacion/routed/admin/operacion-new-admin-routed/operacion-new-admin-routed.component';
import { OperacionPlistAdminRoutedComponent } from './componente/application/operacion/routed/admin/operacion-plist-admin-routed/operacion-plist-admin-routed.component';
import { OperacionRemoveAdminRoutedComponent } from './componente/application/operacion/routed/admin/operacion-remove-admin-routed/operacion-remove-admin-routed.component';
import { OperacionViewAdminRoutedComponent } from './componente/application/operacion/routed/admin/operacion-view-admin-routed/operacion-view-admin-routed.component';
import { UsuarioEditAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-edit-admin-routed/usuario-edit-admin-routed.component';
import { UsuarioNewAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-new-admin-routed/usuario-new-admin-routed.component';
import { UsuarioPlistAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-plist-admin-routed/usuario-plist-admin-routed.component';
import { UsuarioRemoveAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-remove-admin-routed/usuario-remove-admin-routed.component';
import { UsuarioViewAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-view-admin-routed/usuario-view-admin-routed.component';
import { HomeComponent } from './componente/shared/routed/home/home.component';
import { LoginComponent } from './componente/shared/routed/login/login.component';
import { LogoutComponent } from './componente/shared/routed/logout/logout.component';
import { MyDatosComponent } from './componente/shared/routed/my-datos/my-datos.component';
import { MyOperacionesComponent } from './componente/shared/routed/my-operaciones/my-operaciones.component';

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "dashboard", component: HomeComponent},

  { path: "login", component: LoginComponent },
  { path: 'logout', component: LogoutComponent }, 

  {path: "plist/usuario", component: UsuarioPlistAdminRoutedComponent},
  {path: "admin/usuario/view/:id", component: UsuarioViewAdminRoutedComponent},
  {path: "admin/usuario/edit/:id", component: UsuarioEditAdminRoutedComponent },
  {path: "admin/usuario/remove/:id", component: UsuarioRemoveAdminRoutedComponent},
  {path: "admin/usuario/new", component: UsuarioNewAdminRoutedComponent},

  {path: "plist/cuenta", component: CuentaPlistAdminRoutedComponent},
  {path: "admin/cuenta/view/:id", component: CuentaViewAdminRoutedComponent},
  {path: "admin/cuenta/edit/:id", component: CuentaEditAdminRoutedComponent},
  {path: "admin/cuenta/remove/:id", component: CuentaRemoveAdminRoutedComponent},
  {path: "admin/cuenta/new", component: CuentaNewAdminRoutedComponent},
  
  
  {path: "plist/operacion", component: OperacionPlistAdminRoutedComponent},
  {path: "admin/operacion/view/:id", component: OperacionViewAdminRoutedComponent},
  {path: "admin/operacion/edit/:id", component: OperacionEditAdminRoutedComponent},
  {path: "admin/operacion/remove/:id", component: OperacionRemoveAdminRoutedComponent},
  {path: "admin/operacion/new", component: OperacionNewAdminRoutedComponent},

  {path: "usuario/my-datos", component: MyDatosComponent},
  {path: "usuario/my-operaciones", component: MyOperacionesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
