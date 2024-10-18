import { Component, computed, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from "@angular/material/sidenav";
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MenuComponent,
    ToolbarComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  collapse = signal(true);
  windowWidth = signal(window.innerWidth);
  isMobile = signal(this.windowWidth() < 800);
  sidenavWidth = computed(() => this.isMobile() ? this.collapse() ? '0' : '100%' : this.collapse() ? '65px' : '250px');

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth.set(window.innerWidth);
    this.isMobile.set(this.windowWidth() < 800);
  }

  updateCollapse(newValue: boolean) {
    this.collapse.set(newValue);
  }

}
