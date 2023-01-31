import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioRemoveAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-remove-admin-routed/usuario-remove-admin-routed.component';
import { LoginComponent } from './componente/shared/routed/login/login.component';
import { DropdownRegisterPageComponent } from './componente/shared/unrouted/dropdown-register-page/dropdown-register-page.component';
import { MenuComponent } from './componente/shared/unrouted/menu/menu.component';
import { PaginationUnroutedComponent } from './componente/shared/unrouted/pagination-unrouted/pagination-unrouted.component';
import { PaginationComponent } from './componente/shared/unrouted/pagination/pagination.component';
import { SearchUnroutedComponent } from './componente/shared/unrouted/search-unrouted/search-unrouted.component';
import { PaginationService } from './servicio/pagination.service';
import { UsuarioViewAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-view-admin-routed/usuario-view-admin-routed.component';
import { UsuarioNewAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-new-admin-routed/usuario-new-admin-routed.component';
import { UsuarioEditAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-edit-admin-routed/usuario-edit-admin-routed.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './componente/shared/routed/home/home.component';
import { TipoUsuarioPlistAdminRoutedComponent } from './componente/application/tipousuario/unrouted/tipousuario-plist-admin-unrouted/tipousuario-plist-admin-unrouted.component';
import { CuentaViewAdminRoutedComponent } from './componente/application/cuenta/routed/admin/cuenta-view-admin-routed/cuenta-view-admin-routed.component';
import { CuentaRemoveAdminRoutedComponent } from './componente/application/cuenta/routed/admin/cuenta-remove-admin-routed/cuenta-remove-admin-routed.component';
import { CuentaPlistAdminRoutedComponent } from './componente/application/cuenta/routed/admin/cuenta-plist-admin-routed/cuenta-plist-admin-routed.component';
import { CuentaNewAdminRoutedComponent } from './componente/application/cuenta/routed/admin/cuenta-new-admin-routed/cuenta-new-admin-routed.component';
import { UsuarioPlistAdminUnRoutedComponent } from './componente/application/usuario/unrouted/usuario-plist-admin-unrouted/usuario-plist-admin-unrouted.component';
import { UsuarioPlistAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-plist-admin-routed/usuario-plist-admin-routed.component';
import { TipoCuentaPlistAdminUnRoutedComponent } from './componente/application/tipocuenta/unrouted/tipocuenta-plist-admin-unrouted/tipocuenta-plist-admin-unrouted.component';
import { CuentaEditAdminRoutedComponent } from './componente/application/cuenta/routed/admin/cuenta-edit-admin-routed/cuenta-edit-admin-routed.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CuentaPlistAdminUnroutedComponent } from './componente/application/cuenta/unrouted/cuenta-plist-admin-unrouted/cuenta-plist-admin-unrouted.component';
import { OperacionViewAdminRoutedComponent } from './componente/application/operacion/routed/admin/operacion-view-admin-routed/operacion-view-admin-routed.component';
import { OperacionRemoveAdminRoutedComponent } from './componente/application/operacion/routed/admin/operacion-remove-admin-routed/operacion-remove-admin-routed.component';
import { OperacionPlistAdminRoutedComponent } from './componente/application/operacion/routed/admin/operacion-plist-admin-routed/operacion-plist-admin-routed.component';
import { OperacionNewAdminRoutedComponent } from './componente/application/operacion/routed/admin/operacion-new-admin-routed/operacion-new-admin-routed.component';
import { TipoOperacionPlistAdminUnRoutedComponent } from './componente/application/tipooperacion/unrouted/tipooperacion-plist-admin-unrouted/tipooperacion-plist-admin-unrouted.component';
import { OperacionEditAdminRoutedComponent } from './componente/application/operacion/routed/admin/operacion-edit-admin-routed/operacion-edit-admin-routed.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    SearchUnroutedComponent,
    PaginationComponent,
    DropdownRegisterPageComponent,
    PaginationUnroutedComponent,
    UsuarioRemoveAdminRoutedComponent,
    UsuarioViewAdminRoutedComponent,
    UsuarioNewAdminRoutedComponent,
    UsuarioEditAdminRoutedComponent,
    HomeComponent,
    TipoUsuarioPlistAdminRoutedComponent,
    CuentaViewAdminRoutedComponent,
    CuentaRemoveAdminRoutedComponent,
    CuentaPlistAdminRoutedComponent,
    CuentaNewAdminRoutedComponent,
    UsuarioPlistAdminUnRoutedComponent,
    UsuarioPlistAdminRoutedComponent,
    TipoCuentaPlistAdminUnRoutedComponent,
    CuentaEditAdminRoutedComponent,
    CuentaPlistAdminUnroutedComponent,
    OperacionViewAdminRoutedComponent,
    OperacionRemoveAdminRoutedComponent,
    OperacionPlistAdminRoutedComponent,
    OperacionNewAdminRoutedComponent,
    TipoOperacionPlistAdminUnRoutedComponent,
    OperacionEditAdminRoutedComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    PaginationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
