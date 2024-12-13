import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/models/apiResponse.model';
import { catchError, Observable, tap } from 'rxjs';
import { UtilsService } from '../../shared/services/utils.service';
import { RutinaDiaria } from '../../shared/models/rutina-diaria.model';
import { CONSTANTS } from '../../shared/api.constants';
import { Registro } from '../../shared/models/registro.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
  ) { }

    // TODO: replace all hardcoded id's to be dynamic
    hardcodedUsuario: number = 1;


  getRutinaDiaUsuario(){
    return this.http.get<ApiResponse<RutinaDiaria[]>>(this.utilsService.replaceUrlId(CONSTANTS.get_usuario_rutina_dia, this.hardcodedUsuario)).pipe(
      tap((response: ApiResponse<RutinaDiaria[]>) => this.utilsService.log(`getRutinaUsuario Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<RutinaDiaria[]>>())
    )
  }

  crearUsuarioRegistro(data: FormGroup): Observable<ApiResponse<Registro>>{
    return this.http.post<ApiResponse<Registro>>(this.utilsService.replaceUrlId(CONSTANTS.crear_usuario_registro, this.hardcodedUsuario), data).pipe(
      tap((response: ApiResponse<Registro>) => this.utilsService.log(`crearUsuarioRutina Response: ${response}`)),
      catchError(this.utilsService.handleError<ApiResponse<Registro>>())
    )
  }


}
