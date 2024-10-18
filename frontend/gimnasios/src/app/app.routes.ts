import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HelpComponent } from './features/help/help.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'help',
    component: HelpComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];
