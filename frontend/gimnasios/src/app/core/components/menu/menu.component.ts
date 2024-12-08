import { Component, Input, signal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MenuItemComponent } from '../menu-item/menu-item.component';


export type MenuItem = {
  icon: string;
  label: string;
  route: string;
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatListModule,
    MatDivider,
    MenuItemComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  sidenavCollapse = signal(false);
  @Input() set collapse(value: boolean) {
    this.sidenavCollapse.set(value);
  }


  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Home',
      route: '/home',
    },
    {
      icon: 'event',
      label: 'Rutina',
      route: '/rutina',
    },
    {
      icon: 'store',
      label: 'Gimnasio',
      route: '/gestion-gimnasio',
      subItems: [
        {
          icon: 'settings',
          label: 'Datos del gimnasio',
          route: '/datos-gimnasio',
        },
        {
          icon: 'fitness_center',
          label: 'Ejercicios',
          route: '/gestion-ejercicios',
        },
        {
          icon: 'manage_accounts',
          label: 'Usuarios',
          route: '/gestion-usuarios',
        },
      ]
    }
  ]);

}
