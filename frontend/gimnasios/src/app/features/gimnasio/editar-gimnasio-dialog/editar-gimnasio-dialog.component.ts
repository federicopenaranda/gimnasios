import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Gimnasio } from '../../../shared/models/gimnasio.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GestionGimnasioService } from '../gestion-gimnasio.service';
import { ApiResponse } from '../../../shared/models/apiResponse.model';

@Component({
    selector: 'app-editar-gimnasio-dialog',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './editar-gimnasio-dialog.component.html',
    styleUrl: './editar-gimnasio-dialog.component.scss'
})
export class EditarGimnasioDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) protected gimnasioData: Gimnasio,
    private gestionGimnasioService: GestionGimnasioService,
    protected dialogRef: MatDialogRef<EditarGimnasioDialogComponent>
  ){}


  gimnasioForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    direccion: new FormControl('', []),
    celular_whatsapp: new FormControl('', []),
    sitio_web: new FormControl('', []),
  })


  ngOnInit(){
    this.gimnasioForm.patchValue({
      nombre: this.gimnasioData.nombre,
      email: this.gimnasioData.email,
      direccion: this.gimnasioData.direccion,
      celular_whatsapp: this.gimnasioData.celular_whatsapp,
      sitio_web: this.gimnasioData.sitio_web
    })
  }


  onSubmit(): void {
    if(this.gimnasioForm.invalid){
      return;
    }

    this.gestionGimnasioService.editarGimnasio(this.gimnasioForm).subscribe((data: ApiResponse<Gimnasio>) => {
      if(data.statusCode !== 200){
        return;
      }

      this.dialogRef.close({
        dialogResult: 200
      })
    })
  }

}
