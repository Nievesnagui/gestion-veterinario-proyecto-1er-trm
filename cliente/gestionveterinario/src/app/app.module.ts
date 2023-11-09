import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//--
//import { MatSnackBar } from '@angular/material/snack-bar';
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

@NgModule({
  declarations: [
   AppComponent,
   HomeRoutedComponent,
   MenubarUnroutedComponent,
   FooterUnroutedComponent,
   VeterinarioViewRoutedComponent,
    //
    VeterinarioPlistRoutedComponent,
    VeterinarioSelectionUnroutedComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    BrowserAnimationsModule,
  ],
  providers: [
    VeterinarioAjaxService, 
    //MatSnackBar, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
