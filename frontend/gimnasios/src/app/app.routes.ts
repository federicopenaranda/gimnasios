import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HelpComponent } from './features/help/help.component';
import { DatosGimnasioComponent } from './features/gimnasio/datos-gimnasio/datos-gimnasio.component';
import { GestionEjerciciosComponent } from './features/gimnasio/gestion-ejercicios/gestion-ejercicios.component';
import { GestionUsuariosComponent } from './features/gimnasio/gestion-usuarios/gestion-usuarios.component';
import { GestionGimnasioComponent } from './features/gimnasio/gestion-gimnasio.component';
import { DetallesUsuariosComponent } from './features/gimnasio/gestion-usuarios/detalles-usuarios/detalles-usuarios.component';

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
    path:'gestion-gimnasio',
    component:GestionGimnasioComponent,
    children: [
      {
        path: 'gestion-ejercicios',
        component: GestionEjerciciosComponent
      },
      {
        path: 'datos-gimnasio',
        component: DatosGimnasioComponent
      },
      {
        path: 'gestion-usuarios',
        component: GestionUsuariosComponent,
      },
    ]
  },
  {
    path: 'usuario/:id',
    component: DetallesUsuariosComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];
