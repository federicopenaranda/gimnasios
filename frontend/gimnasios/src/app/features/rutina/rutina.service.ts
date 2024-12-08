import { Injectable } from '@angular/core';
import { UtilsService } from '../../shared/services/utils.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../shared/models/apiResponse.model';
import { Ejercicio } from '../../shared/models/ejercicio.model';
import { catchError, Observable, tap } from 'rxjs';
import { CONSTANTS } from '../../shared/api.constants';
import { FormArray, FormGroup } from '@angular/forms';
import { Rutina } from '../../shared/models/rutina.model';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  constructor(
    private utilsService: UtilsService,
    private http: HttpClient
  ) { }

  // TODO: replace all hardcoded id's to be dynamic
  hardcodedGimnasio: number = 60;
  hardcodedUsuario: number = 1;


  getGimnasioEjercicios(){
    return this.http.get<ApiResponse<Ejercicio[]>>(this.utilsService.replaceUrlId(CONSTANTS.get_gimnasio_ejercicios, this.hardcodedGimnasio)).pipe(
      tap((response: ApiResponse<Ejercicio[]>) => this.utilsService.log(`getGimnasioEjercicios Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<Ejercicio[]>>())
    )
  }

  guardarRutina(form: FormArray): Observable<ApiResponse<Rutina>>{
    return this.http.post<ApiResponse<Rutina>>(this.utilsService.replaceUrlId(CONSTANTS.crear_rutina, this.hardcodedUsuario), form.value).pipe(
      tap((response: ApiResponse<Rutina>) => this.utilsService.log(`guardarRutina Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<Rutina>>())
    )
  }

  getUsuarioRutina(): Observable<ApiResponse<Rutina[]>>{
    return this.http.get<ApiResponse<Rutina[]>>(this.utilsService.replaceUrlId(CONSTANTS.get_usuario_rutina, this.hardcodedUsuario)).pipe(
      tap((response: ApiResponse<Rutina[]>) => this.utilsService.log(`getUsuarioRutina Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<Rutina[]>>())
    )
  }

  eliminarRutina(id: number): Observable<ApiResponse<Rutina>>{
    return this.http.delete<ApiResponse<Rutina>>(this.utilsService.replaceUrlId(CONSTANTS.eliminar_rutina, this.hardcodedUsuario) + `/${id}`).pipe(
      tap((response: ApiResponse<Rutina>) => this.utilsService.log(`eliminarRutinaResponse: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<Rutina>>())
    )
  }

}
