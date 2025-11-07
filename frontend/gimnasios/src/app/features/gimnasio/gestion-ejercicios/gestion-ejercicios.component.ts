import { Component, HostListener, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Ejercicio } from '../../../shared/models/ejercicio.model';
import { ApiResponse } from '../../../shared/models/apiResponse.model';
import { GestionGimnasioService } from '../gestion-gimnasio.service';
import { MatDivider } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { EditarEjercicioDialogComponent } from '../editar-ejercicio-dialog/editar-ejercicio-dialog.component';
import { CrearEjercicioDialogComponent } from '../crear-ejercicio-dialog/crear-ejercicio-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-gestion-ejercicios',
    imports: [
        MatTableModule,
        MatIconModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatTooltipModule,
        MatCardModule,
        FormsModule,
        MatDivider
    ],
    templateUrl: './gestion-ejercicios.component.html',
    styleUrl: './gestion-ejercicios.component.scss'
})
export class GestionEjerciciosComponent {

  gimnasioEjercicios!: Ejercicio[];
  windowWidth = signal(window.innerWidth);


  constructor(
    private gestionGimnasioService: GestionGimnasioService,
    private dialog: MatDialog,
  ){}


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth.set(window.innerWidth);
  }


  ngOnInit(){
    this.updateEjerciciosData()
  }


  updateEjerciciosData(){
    this.gestionGimnasioService.getGimnasioEjercicios().subscribe((data: ApiResponse<Ejercicio[]>) => {
      this.gimnasioEjercicios = data.data;
    })
  }


  editarEjercicio(ejercicioData: Ejercicio){
    let dialog = this.dialog.open(EditarEjercicioDialogComponent, {
      data: ejercicioData,
      height: (this.windowWidth() <= 768) ? '95vh' : '90vh',
      minWidth: (this.windowWidth() <= 768) ? '95vw' : '60vw'
    })

    dialog.afterClosed().subscribe((result: any) => {
      if(result && result.dialogResult !== 200){
        return;
      }
      this.updateEjerciciosData()
    })
  }


  crearEjercicio(){
    let dialog = this.dialog.open(CrearEjercicioDialogComponent, {
      height: (this.windowWidth() <= 768) ? '95vh' : '90vh',
      minWidth: (this.windowWidth() <= 768) ? '95vw' : '60vw'
    })

    dialog.afterClosed().subscribe((result: any) => {
      if(result && result.dialogResult !== 200){
        return;
      }
      this.updateEjerciciosData()
    })
  }


  eliminarEjercicio(ejercicioData: Ejercicio){

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Seguro que quieres eliminar este ejercicio?',
        action: 'Eliminar'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(!result){
        return;
      }

      this.gestionGimnasioService.eliminarEjercicio(ejercicioData.id).subscribe((data: ApiResponse<Ejercicio>) => {
        if(data.statusCode !== 200){
          return;
        }
        this.updateEjerciciosData()
      })

    })


  }


}
