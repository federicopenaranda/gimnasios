import { Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GestionGimnasioService } from '../gestion-gimnasio.service';
import { ApiResponse } from '../../../shared/models/apiResponse.model';
import { User, UserCondicion, UserContacto } from '../../../shared/models/user.model';
import { forkJoin, switchMap } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-editar-usuario-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatLabel,
    MatDividerModule
  ],
  templateUrl: './editar-usuario-dialog.component.html',
  styleUrl: './editar-usuario-dialog.component.scss'
})
export class EditarUsuarioDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) protected userDataInjected: User,
    private gestionGimnasioService: GestionGimnasioService,
    protected dialogRef: MatDialogRef<EditarUsuarioDialogComponent>
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
  })
  usuarioContactoForm: FormGroup = new FormGroup({
    usuario_contacto_edit: new FormArray([], [Validators.required]),
    usuario_contacto_add: new FormArray([], [Validators.required]),
  })
  usuarioCondicionForm: FormGroup = new FormGroup({
    usuario_condicion_edit: new FormArray([], [Validators.required]),
    usuario_condicion_add: new FormArray([], [Validators.required])
  })


  get usuarioCondicionEdit(){
    return this.usuarioCondicionForm.get('usuario_condicion_edit') as FormArray;
  }


  get usuarioCondicionAdd(){
    return this.usuarioCondicionForm.get('usuario_condicion_add') as FormArray;
  }


  get usuarioContactoEdit(){
    return this.usuarioContactoForm.get('usuario_contacto_edit') as FormArray;
  }


  get usuarioContactoAdd(){
    return this.usuarioContactoForm.get('usuario_contacto_add') as FormArray;
  }


  addUsuarioCondicionEdit(id: number, tipoCondicion?: string, descripcion?: string){
    this.usuarioCondicionEdit.push(new FormGroup({
      id: new FormControl(id, [Validators.required]),
      tipo_condicion: new FormControl(tipoCondicion || '', [Validators.required]),
      descripcion: new FormControl(descripcion || '', [Validators.required]),
    }))
  }


  addUsuarioCondicionAdd(tipoCondicion?: string, descripcion?: string){
    this.usuarioCondicionAdd.push(new FormGroup({
      tipo_condicion: new FormControl(tipoCondicion || '', [Validators.required]),
      descripcion: new FormControl(descripcion || '', [Validators.required]),
    }))
  }


  addUsuarioContactoEdit(id: number, telefonoContacto?: string, relacionContacto?: string){
    this.usuarioContactoEdit.push(new FormGroup({
      id: new FormControl(id, [Validators.required]),
      telefono_contacto: new FormControl(telefonoContacto || '', [Validators.required]),
      relacion_contacto: new FormControl(relacionContacto || '', [Validators.required]),
    }))
  }


  addUsuarioContactoAdd(telefonoContacto?: string, relacionContacto?: string){
    this.usuarioContactoAdd.push(new FormGroup({
      telefono_contacto: new FormControl(telefonoContacto || '', [Validators.required]),
      relacion_contacto: new FormControl(relacionContacto || '', [Validators.required]),
    }))
  }


  removeUsuarioContactoEdit(index: number) {
    this.usuarioContactoEdit.removeAt(index)
    const updatedControls = this.usuarioContactoEdit.controls;
    this.usuarioContactoForm.setControl('usuario_contacto_edit', new FormArray(updatedControls));
  }


  removeUsuarioContactoAdd(index: number) {
    this.usuarioContactoAdd.removeAt(index)
    const updatedControls = this.usuarioContactoAdd.controls;
    this.usuarioContactoForm.setControl('usuario_contacto_add', new FormArray(updatedControls));
  }


  removeUsuarioCondicionEdit(index: number) {
    this.usuarioCondicionEdit.removeAt(index)
    const updatedControls = this.usuarioCondicionEdit.controls;
    this.usuarioCondicionForm.setControl('usuario_condicion_edit', new FormArray(updatedControls));
  }


  removeUsuarioCondicionAdd(index: number) {
    this.usuarioCondicionAdd.removeAt(index)
    const updatedControls = this.usuarioCondicionAdd.controls;
    this.usuarioCondicionForm.setControl('usuario_condicion_add', new FormArray(updatedControls));
  }


  ngOnInit(){
    this.gestionGimnasioService.getUsuario(this.userDataInjected.id).subscribe((data: ApiResponse<User>) =>{
      this.userData = data.data;
      this.userForm.patchValue({
        nombre: this.userData.nombre,
        apellido: this.userData.apellido,
        email: this.userData.email,
        telefono: this.userData.telefono,
        celular: this.userData.celular,
        cedula: this.userData.cedula,
        edad: this.userData.edad,
        fecha_nacimiento: this.userData.fecha_nacimiento,
        direccion: this.userData.direccion,
        cobertura_medica: this.userData.cobertura_medica,
        emergencia_movil: this.userData.emergencia_movil,
      })

      this.userData.usuario_condicion.forEach((e: UserCondicion) => {
        this.addUsuarioCondicionEdit(e.id ,e.tipo_condicion, e.descripcion)
      });

      this.userData.usuario_contacto.forEach((e: UserContacto) => {
        this.addUsuarioContactoEdit(e.id, e.telefono_contacto, e.relacion_contacto)
      });
    })
  }


  onSubmit(): void {
    if(this.userForm.invalid){
      return;
    }

    this.gestionGimnasioService.editarUsuario(this.userForm, this.userData.id)
    .pipe(
      switchMap((data: ApiResponse<User>) => {
        if (data.statusCode !== 200) {
          throw new Error('Error editing user');
        }

        const condicionesEditObservables = this.usuarioCondicionEdit.value.map((element: UserCondicion) =>
          this.gestionGimnasioService.editarUsuarioCondicionEdit(element, this.userData.id, element.id)
        );
        const condicionesAddObservables = this.usuarioCondicionAdd.value.map((element: UserCondicion) =>
          this.gestionGimnasioService.editarUsuarioCondicionAdd(element, this.userData.id)
        );
        const contactosEditObservables = this.usuarioContactoEdit.value.map((element: UserContacto) =>
          this.gestionGimnasioService.editarUsuarioContactoEdit(element, this.userData.id, element.id)
        );
        const contactosAddObservables = this.usuarioContactoAdd.value.map((element: UserContacto) =>
          this.gestionGimnasioService.editarUsuarioContactoAdd(element, this.userData.id)
        );

        return forkJoin([
          ...condicionesEditObservables,
          ...condicionesAddObservables,
          ...contactosEditObservables,
          ...contactosAddObservables
        ]);

      })
    )
    .subscribe({
      next: (responses) => {
        const allSuccess = responses.every((element: ApiResponse<UserCondicion | UserContacto>) => element.statusCode === 200);
        if(!allSuccess){
          return;
        }

        this.dialogRef.close({ dialogResult: 200 });
      }
    });
  }


  isFormGroup(control: AbstractControl): boolean{
    return control instanceof FormGroup;
  }


}
