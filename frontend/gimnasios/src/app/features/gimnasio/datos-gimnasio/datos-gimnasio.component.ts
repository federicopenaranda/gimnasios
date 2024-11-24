import { Component, HostListener, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { GestionGimnasioService } from '../gestion-gimnasio.service';
import { Gimnasio } from '../../../shared/models/gimnasio.model';
import { ApiResponse } from '../../../shared/models/apiResponse.model';
import { MatDialog } from '@angular/material/dialog';
import { EditarGimnasioDialogComponent } from '../editar-gimnasio-dialog/editar-gimnasio-dialog.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-datos-gimnasio',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ClipboardModule,
    MatTooltipModule
  ],
  templateUrl: './datos-gimnasio.component.html',
  styleUrl: './datos-gimnasio.component.scss'
})
export class DatosGimnasioComponent {

  constructor(
    private gestionGimnasioService: GestionGimnasioService,
    private dialog: MatDialog
  ){}


  gimnasioData!: Gimnasio
  windowWidth = signal(window.innerWidth);


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth.set(window.innerWidth);
  }


  ngOnInit(){
    this.updateGimnasioData()
  }


  editarGimnasio(){
    let dialog = this.dialog.open(EditarGimnasioDialogComponent, {
      data: this.gimnasioData,
      height: (this.windowWidth() <= 768) ? '95vh' : '90vh',
      minWidth: (this.windowWidth() <= 768) ? '95vw' : '60vw'
    })

    dialog.afterClosed().subscribe((result: any) => {
      if(result.dialogResult !== 200){
        return;
      }

      this.updateGimnasioData()
    })
  }

  updateGimnasioData(){
    this.gestionGimnasioService.getGimnasio().subscribe((data: ApiResponse<Gimnasio>) => {
      this.gimnasioData = data.data;
    })
  }

}
