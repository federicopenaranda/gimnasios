import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { GestionGimnasioService } from '../gestion-gimnasio.service';
import { Ejercicio } from '../../../shared/models/ejercicio.model';
import { ApiResponse } from '../../../shared/models/apiResponse.model';

@Component({
  selector: 'app-crear-ejercicio-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './crear-ejercicio-dialog.component.html',
  styleUrl: './crear-ejercicio-dialog.component.scss'
})
export class CrearEjercicioDialogComponent {

  constructor(
    private gestionGimnasioService: GestionGimnasioService,
    protected dialogRef: MatDialogRef<CrearEjercicioDialogComponent>
  ){}


  ejercicioForm: FormGroup = new FormGroup({
    fk_id_gimnasio: new FormControl(60, [Validators.required]), // TODO: make it dynamic
    nombre: new FormControl('', [Validators.required]),
    grupo_muscular: new FormControl('', []),
    descripcion: new FormControl('', []),
  })
  

  onSubmit(){
    if(this.ejercicioForm.invalid){
      return;
    }

    this.gestionGimnasioService.crearEjercicio(this.ejercicioForm).subscribe((data: ApiResponse<Ejercicio>) => {
      if(data.statusCode !== 200){
        return;
      }

      this.dialogRef.close({
        dialogResult: 200
      })
    })
  }


}
