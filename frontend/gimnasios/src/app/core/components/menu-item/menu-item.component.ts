import { Component, input, signal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { MenuItem } from '../menu/menu.component';
import { MatListModule } from '@angular/material/list';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  animations: [
    trigger('expandContractMenu',[
      transition(':enter',[
        style({
          opacity:0,
          height:0,
        }),
        animate('.5s ease-in-out', style({ opacity:1, height:'*'}))
      ]),
      transition(':leave',[
        animate('.5s ease-in-out', style({ opacity:0, height:0}))
      ])
    ])
  ],
  imports: [
    MatListModule,
    MatDivider,
    RouterLink,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {

  item = input.required<MenuItem>();
  collapse = input(false);
  nestedMenuOpen = signal(false);

}
