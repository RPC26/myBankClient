import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioEditAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-edit-admin-routed/usuario-edit-admin-routed.component';
import { UsuarioNewAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-new-admin-routed/usuario-new-admin-routed.component';
import { UsuarioPlistAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-plist-admin-routed/usuario-plist-admin-routed.component';
import { UsuarioRemoveAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-remove-admin-routed/usuario-remove-admin-routed.component';
import { UsuarioViewAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-view-admin-routed/usuario-view-admin-routed.component';
import { HomeComponent } from './componente/shared/routed/home/home.component';
import { LoginComponent } from './componente/shared/routed/login/login.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path:"login", component: LoginComponent },
  {path: "plist/usuario", component: UsuarioPlistAdminRoutedComponent},
  {path: "admin/usuario/view/:id", component: UsuarioViewAdminRoutedComponent},
  {path: "admin/usuario/edit/:id", component: UsuarioEditAdminRoutedComponent },
  {path: "admin/usuario/remove/:id", component: UsuarioRemoveAdminRoutedComponent},
  {path: "admin/usuario/new", component: UsuarioNewAdminRoutedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
