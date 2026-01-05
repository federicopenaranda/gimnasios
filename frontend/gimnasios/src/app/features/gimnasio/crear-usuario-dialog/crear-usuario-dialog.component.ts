import { Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GestionGimnasioService } from '../gestion-gimnasio.service';
import { ApiResponse } from '../../../shared/models/apiResponse.model';
import { User } from '../../../shared/models/user.model';
import { usuarioGimnasio } from '../../../shared/models/usuario-gimnasio.model';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-crear-usuario-dialog',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatLabel,
        MatCardModule
    ],
    templateUrl: './crear-usuario-dialog.component.html',
    styleUrl: './crear-usuario-dialog.component.scss'
})
export class CrearUsuarioDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) protected userDataInjected: User,
    private gestionGimnasioService: GestionGimnasioService,
    protected dialogRef: MatDialogRef<CrearUsuarioDialogComponent>
  ){}


  userData!: User
  userForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', []),
    celular: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', []),
    edad: new FormControl(0, [Validators.required]),
    fecha_nacimiento: new FormControl('', []),
    direccion: new FormControl('', []),
    cobertura_medica: new FormControl('', []),
    emergencia_movil: new FormControl('', []),
    usuario_contacto: new FormArray([], []),
    usuario_condicion: new FormArray([], []),
  })


  get usuarioCondicion(){
    return this.userForm.get('usuario_condicion') as FormArray;
  }


  get usuarioContacto(){
    return this.userForm.get('usuario_contacto') as FormArray;
  }


  addUsuarioCondicion(tipoCondicion?: string, descripcion?: string){
    this.usuarioCondicion.push(new FormGroup({
      tipo_condicion: new FormControl(tipoCondicion || '', [Validators.required]),
      descripcion: new FormControl(descripcion || '', [Validators.required]),
    }))
  }


  addUsuarioContacto(telefonoContacto?: string, relacionContacto?: string){
    this.usuarioContacto.push(new FormGroup({
      telefono_contacto: new FormControl(telefonoContacto || '', [Validators.required]),
      relacion_contacto: new FormControl(relacionContacto || '', [Validators.required]),
    }))
  }


  removeUsuarioContacto(index: number) {
    this.usuarioContacto.removeAt(index)
    const updatedControls = this.usuarioContacto.controls;
    this.userForm.setControl('usuario_contacto', new FormArray(updatedControls));
  }


  removeUsuarioCondicion(index: number) {
    this.usuarioCondicion.removeAt(index)
    const updatedControls = this.usuarioCondicion.controls;
    this.userForm.setControl('usuario_condicion', new FormArray(updatedControls));
  }


  onSubmit(): void {
    if(this.userForm.invalid){
      return;
    }

    this.gestionGimnasioService.crearUsuario(this.userForm).subscribe((data: ApiResponse<User>) => {
      if(data.statusCode !== 200){
        return;
      }

    let usuarioGimnasioForm: FormGroup = new FormGroup({
      fk_id_usuario: new FormControl(Number(data.data.id), [Validators.required]),
      fk_id_gimnasio: new FormControl(1, [Validators.required]), // TODO: replace to dynamic value
      fecha_inicio: new FormControl(new Date(), [Validators.required]),
      fecha_final: new FormControl(null, []),
    })

    this.gestionGimnasioService.crearUsuarioGimnasio(usuarioGimnasioForm).subscribe((data: ApiResponse<usuarioGimnasio>) => {
      this.dialogRef.close({
        dialogResult: 200
      })
    })
    })
  }


  isFormGroup(control: AbstractControl): boolean{
    return control instanceof FormGroup
  }


}
