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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    BrowserAnimationsModule,
    MatRadioModule,
    PaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    DialogModule,
    ConfirmDialogModule, 
  ],
  providers: [
    VeterinarioAjaxService, 
    MatSnackBar, 
    MatFormFieldModule,
    DialogService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
