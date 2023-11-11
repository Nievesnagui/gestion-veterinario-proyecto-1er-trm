import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { VeterinarioViewRoutedComponent } from './components/veterinario/veterinario-view-routed/veterinario-view-routed.component';
import { VeterinarioPlistRoutedComponent } from './components/veterinario/veterinario-plist-routed/veterinario-plist-routed.component';
import { VeterinarioNewRoutedComponent } from './components/veterinario/veterinario-new-routed/veterinario-new-routed.component';
import { VeterinarioEditRoutedComponent } from './components/veterinario/veterinario-edit-routed/veterinario-edit-routed.component';
import { MascotaViewRoutedComponent } from './components/mascota/mascota-view-routed/mascota-view-routed.component';
import { MascotaPlistRoutedComponent } from './components/mascota/mascota-plist-routed/mascota-plist-routed.component';
import { MascotaNewRoutedComponent } from './components/mascota/mascota-new-routed/mascota-new-routed.component';
import { MascotaEditRoutedComponent } from './components/mascota/mascota-edit-routed/mascota-edit-routed.component';

const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  { path: 'home', component: HomeRoutedComponent },
  { path: 'veterinario/view/:id', component: VeterinarioViewRoutedComponent },
  { path: 'veterinario/plist', component: VeterinarioPlistRoutedComponent },
  { path: 'veterinario/new', component: VeterinarioNewRoutedComponent },
  { path: 'veterinario/edit/:id', component: VeterinarioEditRoutedComponent },
  { path: 'mascota/view/:id', component: MascotaViewRoutedComponent },
  { path: 'mascota/plist', component: MascotaPlistRoutedComponent },
  { path: 'mascota/new', component: MascotaNewRoutedComponent },
  { path: 'mascota/edit/:id', component: MascotaEditRoutedComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
