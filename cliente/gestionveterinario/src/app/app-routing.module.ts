import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';

const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  { path: 'home', component: HomeRoutedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
