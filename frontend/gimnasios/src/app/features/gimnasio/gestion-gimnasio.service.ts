import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Gimnasio } from '../../shared/models/gimnasio.model';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../../shared/api.constants';
import { UtilsService } from '../../shared/services/utils.service';
import { ApiResponse } from '../../shared/models/apiResponse.model';
import { FormArray, FormGroup } from '@angular/forms';
import { User, UserCondicion, UserContacto } from '../../shared/models/user.model';
import { Ejercicio } from '../../shared/models/ejercicio.model';
import { usuarioGimnasio } from '../../shared/models/usuario-gimnasio.model';

@Injectable({
  providedIn: 'root'
})
export class GestionGimnasioService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  // TODO: replace all hardcoded id's to be dynamic
  hardcodedGimnasio: number = 60;

  getGimnasio(): Observable<ApiResponse<Gimnasio>>{
    return this.http.get<ApiResponse<Gimnasio>>(CONSTANTS.get_gimnasio + `/${this.hardcodedGimnasio}`).pipe(
      tap((response: ApiResponse<Gimnasio>) => this.utilsService.log(`getGimnasio Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<Gimnasio>>())
    )
  }

  getGimnasioUsuarios(){
    return this.http.get<ApiResponse<User[]>>(this.utilsService.replaceUrlId(CONSTANTS.get_gimnasio_usuarios, `${1}`)).pipe(
      tap((response: ApiResponse<User[]>) => this.utilsService.log(`getGimnasioUsuarios Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<User[]>>())
    )
  }

  getGimnasioEjercicios(){
    return this.http.get<ApiResponse<Ejercicio[]>>(this.utilsService.replaceUrlId(CONSTANTS.get_gimnasio_ejercicios, `${this.hardcodedGimnasio}`)).pipe(
      tap((response: ApiResponse<Ejercicio[]>) => this.utilsService.log(`getGimnasioEjercicios Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<Ejercicio[]>>())
    )
  }

  getUsuario(id: number): Observable<ApiResponse<User>>{
    return this.http.get<ApiResponse<User>>(CONSTANTS.get_usuario + id).pipe(
      tap((response: ApiResponse<User>) => this.utilsService.log(`getUsuario Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<User>>())
    )
  }

  editarGimnasio(form: FormGroup): Observable<ApiResponse<Gimnasio>>{
    return this.http.patch<ApiResponse<Gimnasio>>(CONSTANTS.editar_gimnasio + `/${this.hardcodedGimnasio}`, form.value).pipe(
      tap((response: ApiResponse<Gimnasio>) => this.utilsService.log(`editarGimnasio Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<Gimnasio>>())
    )
  }

  editarUsuario(form: FormGroup, id: number): Observable<ApiResponse<User>>{
    return this.http.patch<ApiResponse<User>>(CONSTANTS.editar_usuario + id, form.value).pipe(
      tap((response: ApiResponse<User>) => this.utilsService.log(`editarUsuario Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<User>>())
    )
  }

  editarUsuarioCondicionEdit(form: UserCondicion, id: number, condicionId: number): Observable<ApiResponse<UserCondicion>>{
    return this.http.patch<ApiResponse<UserCondicion>>(this.utilsService.replaceUrlId(CONSTANTS.editar_usuario_condicion_edit, id) + `/${condicionId}`, form).pipe(
      tap((response: ApiResponse<UserCondicion>) => this.utilsService.log(`editarUsuarioCondicionEdit Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<UserCondicion>>())
    )
  }

  editarUsuarioContactoEdit(form: UserContacto, id: number, contactoId: number): Observable<ApiResponse<UserContacto>>{
    return this.http.patch<ApiResponse<UserContacto>>(this.utilsService.replaceUrlId(CONSTANTS.editar_usuario_contacto_edit, id) + `/${contactoId }`, form).pipe(
      tap((response: ApiResponse<UserContacto>) => this.utilsService.log(`editarUsuarioContactoEdit Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<UserContacto>>())
    )
  }

  editarUsuarioCondicionAdd(form: UserCondicion, id: number): Observable<ApiResponse<UserCondicion>>{
    return this.http.post<ApiResponse<UserCondicion>>(this.utilsService.replaceUrlId(CONSTANTS.editar_usuario_condicion_add, id), form).pipe(
      tap((response: ApiResponse<UserCondicion>) => this.utilsService.log(`editarUsuarioCondicionAdd Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<UserCondicion>>())
    )
  }

  editarUsuarioContactoAdd(form: UserContacto, id: number): Observable<ApiResponse<UserContacto>>{
    return this.http.post<ApiResponse<UserContacto>>(this.utilsService.replaceUrlId(CONSTANTS.editar_usuario_contacto_add, id), form).pipe(
      tap((response: ApiResponse<UserContacto>) => this.utilsService.log(`editarUsuarioContactoAdd Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<UserContacto>>())
    )
  }

  editarEjercicio(form: FormGroup, id: number): Observable<ApiResponse<Ejercicio>>{
    return this.http.patch<ApiResponse<Ejercicio>>(CONSTANTS.editar_ejercicio + id, form.value).pipe(
      tap((response: ApiResponse<Ejercicio>) => this.utilsService.log(`editarEjercicio Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<Ejercicio>>())
    )
  }

  crearEjercicio(form: FormGroup): Observable<ApiResponse<Ejercicio>>{
    return this.http.post<ApiResponse<Ejercicio>>(CONSTANTS.crear_ejercicio, form.value).pipe(
      tap((response: ApiResponse<Ejercicio>) => this.utilsService.log(`crearEjercicio Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<Ejercicio>>())
    )
  }

  crearUsuario(form: FormGroup): Observable<ApiResponse<User>>{
    return this.http.post<ApiResponse<User>>(CONSTANTS.crear_usuario, form.value).pipe(
      tap((response: ApiResponse<User>) => this.utilsService.log(`crearUsuario Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<User>>())
    )
  }


  crearUsuarioGimnasio(form: FormGroup): Observable<ApiResponse<usuarioGimnasio>>{
    return this.http.post<ApiResponse<usuarioGimnasio>>(CONSTANTS.crear_usuario_gimnasio, form.value).pipe(
      tap((response: ApiResponse<usuarioGimnasio>) => this.utilsService.log(`crearUsuarioGimnasio Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<usuarioGimnasio>>())
    )
  }


  eliminarEjercicio(id: number): Observable<ApiResponse<Ejercicio>>{
    return this.http.delete<ApiResponse<Ejercicio>>(CONSTANTS.eliminar_ejercicio + `/${id}`).pipe(
      tap((response: ApiResponse<Ejercicio>) => this.utilsService.log(`editarEjercicio Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<Ejercicio>>())
    )
  }


}


