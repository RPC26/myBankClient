import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioRemoveAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-remove-admin-routed/usuario-remove-admin-routed.component';
import { UsuarioPlistAdminRoutedComponent } from './componente/application/usuario/routed/admin/usuario-plist-admin-routed/usuario-plist-admin-routed.component';
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


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    UsuarioPlistAdminRoutedComponent,
    SearchUnroutedComponent,
    PaginationComponent,
    DropdownRegisterPageComponent,
    PaginationUnroutedComponent,
    UsuarioRemoveAdminRoutedComponent,
    UsuarioViewAdminRoutedComponent,
    UsuarioNewAdminRoutedComponent,
    UsuarioEditAdminRoutedComponent,
    HomeComponent,
    TipoUsuarioPlistAdminRoutedComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
