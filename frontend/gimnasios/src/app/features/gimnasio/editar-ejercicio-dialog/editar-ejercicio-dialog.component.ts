import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { GestionGimnasioService } from '../gestion-gimnasio.service';
import { Ejercicio } from '../../../shared/models/ejercicio.model';
import { ApiResponse } from '../../../shared/models/apiResponse.model';

@Component({
  selector: 'app-editar-ejercicio-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './editar-ejercicio-dialog.component.html',
  styleUrl: './editar-ejercicio-dialog.component.scss'
})
export class EditarEjercicioDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) protected ejercicioData: Ejercicio,
    private gestionGimnasioService: GestionGimnasioService,
    protected dialogRef: MatDialogRef<EditarEjercicioDialogComponent>
  ){}


  ejercicioForm: FormGroup = new FormGroup({
    fk_id_gimnasio: new FormControl(null, [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    grupo_muscular: new FormControl('', []),
    descripcion: new FormControl('', []),
  })


  ngOnInit(){
    this.ejercicioForm.patchValue({
      fk_id_gimnasio: Number(this.ejercicioData.fk_id_gimnasio),
      nombre: this.ejercicioData.nombre,
      grupo_muscular: this.ejercicioData.grupo_muscular,
      descripcion: this.ejercicioData.descripcion,
    })
  }


  onSubmit(){
    if(this.ejercicioForm.invalid){
      return;
    }

    this.gestionGimnasioService.editarEjercicio(this.ejercicioForm, this.ejercicioData.id).subscribe((data: ApiResponse<Ejercicio>) => {
      if(data.statusCode !== 200){
        return;
      }

      this.dialogRef.close({
        dialogResult: 200
      })
    })
  }


}
