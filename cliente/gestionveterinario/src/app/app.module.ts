import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { MenubarUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted/menu-unrouted.component';
import { MenubarModule } from 'primeng/menubar';
import { FooterUnroutedComponent } from './components/shared/footer-unrouted/footer-unrouted/footer-unrouted.component';
import { VeterinarioAjaxService } from './service/veterinario.ajax.service';
import { VeterinarioViewRoutedComponent } from './components/veterinario/veterinario-view-routed/veterinario-view-routed.component';

@NgModule({
  declarations: [
   AppComponent,
   HomeRoutedComponent,
   MenubarUnroutedComponent,
   FooterUnroutedComponent,
   VeterinarioViewRoutedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
  ],
  providers: [
    VeterinarioAjaxService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
