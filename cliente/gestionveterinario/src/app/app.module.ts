import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//--
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//--
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { MenubarUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted/menu-unrouted.component';
import { MenubarModule } from 'primeng/menubar';
import { FooterUnroutedComponent } from './components/shared/footer-unrouted/footer-unrouted/footer-unrouted.component';
import { VeterinarioAjaxService } from './service/veterinario.ajax.service';
import { VeterinarioViewRoutedComponent } from './components/veterinario/veterinario-view-routed/veterinario-view-routed.component';
import { VeterinarioSelectionUnroutedComponent } from './components/veterinario/veterinario-selection-unrouted/veterinario-selection-unrouted.component';
import { VeterinarioPlistRoutedComponent } from './components/veterinario/veterinario-plist-routed/veterinario-plist-routed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VeterinarioNewRoutedComponent } from './components/veterinario/veterinario-new-routed/veterinario-new-routed.component';
import { VeterinarioEditRoutedComponent } from './components/veterinario/veterinario-edit-routed/veterinario-edit-routed.component';
import { VeterinarioPlistUnroutedComponent } from './components/veterinario/veterinario-plist-unrouted/veterinario-plist-unrouted.component';
import { VeterinarioFormUnroutedComponent } from './components/veterinario/veterinario-form-unrouted/veterinario-form-unrouted.component';
import { VeterinairoDetailUnroutedComponent } from './components/veterinario/veterinairo-detail-unrouted/veterinairo-detail-unrouted.component';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MascotaViewRoutedComponent } from './components/mascota/mascota-view-routed/mascota-view-routed.component';
import { MascotaSelectionUnroutedComponent } from './components/mascota/mascota-selection-unrouted/mascota-selection-unrouted.component';
import { MascotaAjaxService } from './service/mascota.ajax.service';
import { MascotaPlistUnroutedComponent } from './components/mascota/mascota-plist-unrouted/mascota-plist-unrouted.component';
import { MascotaPlistRoutedComponent } from './components/mascota/mascota-plist-routed/mascota-plist-routed.component';
import { MascotaNewRoutedComponent } from './components/mascota/mascota-new-routed/mascota-new-routed.component';
import { MascotaFormUnroutedComponent } from './components/mascota/mascota-form-unrouted/mascota-form-unrouted.component';
import { MascotaEditRoutedComponent } from './components/mascota/mascota-edit-routed/mascota-edit-routed.component';
import { MascotaDetailUnroutedComponent } from './components/mascota/mascota-detail-unrouted/mascota-detail-unrouted.component';
import { CitaSelectionUnroutedComponent } from './components/cita/cita-selection-unrouted/cita-selection-unrouted.component';
import { CitaViewRoutedComponent } from './components/cita/cita-view-routed/cita-view-routed.component';
import { CitaPlistUnroutedComponent } from './components/cita/cita-plist-unrouted/cita-plist-unrouted.component';
import { CitaPlistRoutedComponent } from './components/cita/cita-plist-routed/cita-plist-routed.component';
import { CitaNewRoutedComponent } from './components/cita/cita-new-routed/cita-new-routed.component';
import { CitaFormUnroutedComponent } from './components/cita/cita-form-unrouted/cita-form-unrouted.component';
import { CitaEditRoutedComponent } from './components/cita/cita-edit-routed/cita-edit-routed.component';
import { CitaDetailUnroutedComponent } from './components/cita/cita-detail-unrouted/cita-detail-unrouted.component';
import { CitaAjaxService } from './service/cita.ajax.service';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { CryptoService } from './service/crypto.service';
import { SessionAjaxService } from './service/session.ajax.service';
import { AuthInterceptor } from './interceptors/auth.interceptors';
import { CalendarModule } from 'primeng/calendar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { UserCitaPlistUnroutedComponent } from './components/cita/user-cita-plist-unrouted/user-cita-plist-unrouted.component';
import { UserCitaDetailUnroutedComponent } from './components/cita/user-cita-detail-unrouted/user-cita-detail-unrouted.component';
import { UserCitaFormUnroutedComponent } from './components/cita/user-cita-form-unrouted/user-cita-form-unrouted.component';
//-- 
//import { CryptoService } from './service/crypto.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeRoutedComponent,
    MenubarUnroutedComponent,
    FooterUnroutedComponent,
    //--
    VeterinarioViewRoutedComponent,
    VeterinarioPlistRoutedComponent,
    VeterinarioPlistUnroutedComponent,
    VeterinarioSelectionUnroutedComponent,
    VeterinarioNewRoutedComponent,
    VeterinarioEditRoutedComponent,
    VeterinarioFormUnroutedComponent,
    VeterinairoDetailUnroutedComponent,
    //--
    MascotaViewRoutedComponent,
    MascotaSelectionUnroutedComponent,
    MascotaPlistUnroutedComponent,
    MascotaPlistRoutedComponent,
    MascotaNewRoutedComponent,
    MascotaFormUnroutedComponent,
    MascotaEditRoutedComponent,
    MascotaDetailUnroutedComponent,
    //--
    CitaViewRoutedComponent,
    CitaSelectionUnroutedComponent,
    CitaPlistUnroutedComponent,
    CitaPlistRoutedComponent,
    CitaNewRoutedComponent,
    CitaFormUnroutedComponent,
    CitaEditRoutedComponent,
    CitaDetailUnroutedComponent,
    UserCitaPlistUnroutedComponent,
    UserCitaDetailUnroutedComponent,
    UserCitaFormUnroutedComponent,
    //--
    LoginRoutedComponent,
    LogoutRoutedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    FormsModule,
    //--
    BrowserAnimationsModule,
    DynamicDialogModule,
    PaginatorModule,
    TableModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    CalendarModule,
    TooltipModule,
    //Mat
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,

  ],
  providers: [
    CitaAjaxService,
    VeterinarioAjaxService,
    MascotaAjaxService,
    MatSnackBar,
    MatFormFieldModule,
    DialogService,
    ConfirmationService,
    CryptoService,
    SessionAjaxService,
    MessageService,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
