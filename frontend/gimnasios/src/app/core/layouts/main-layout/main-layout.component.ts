import { Component, computed, HostListener, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from "@angular/material/sidenav";
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
    selector: 'app-main-layout',
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

  @Input() projectTitle!: string;
  collapse = signal(true);
  windowWidth = signal(window.innerWidth);
  sidenavWidth = computed(() => (this.windowWidth() <= 768) ? this.collapse() ? '0' : '100%' : this.collapse() ? '76px' : '250px');


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth.set(window.innerWidth);
  }


  updateCollapse(newValue: boolean) {
    this.collapse.set(newValue);
  }


}
