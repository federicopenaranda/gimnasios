import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { GestionGimnasioService } from './features/gimnasio/gestion-gimnasio.service';
import { Gimnasio } from './shared/models/gimnasio.model';
import { ApiResponse } from './shared/models/apiResponse.model';

@Component({
    selector: 'app-root',
    imports: [CommonModule, MainLayoutComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private gestionGimnasioService: GestionGimnasioService
  ){}


  title = 'gimnasio';


  ngOnInit(){
    this.gestionGimnasioService.getGimnasio().subscribe((data: ApiResponse<Gimnasio>) => {
      this.title = data.data.nombre || 'gimnasio';
    })
  }
}
