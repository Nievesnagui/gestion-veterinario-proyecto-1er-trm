import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { VeterinarioViewRoutedComponent } from './components/veterinario/veterinario-view-routed/veterinario-view-routed/veterinario-view-routed.component';

const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  { path: 'home', component: HomeRoutedComponent },
  { path: 'veterinario/view/:id', component: VeterinarioViewRoutedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
