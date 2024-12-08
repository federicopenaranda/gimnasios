import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private snackBar: MatSnackBar
  ) {}


  handleError<T>(result?: T): any{
    return (error: any): Observable<T> => {
      if (error.status && error.status == 401){
        // TODO: Logout user
      }

      this.snackBar.open(error.message, 'Cerrar', {
        duration: 2000,
      });

      return of(result as T)
    }
  }


  log(m: string): void{
    console.log(m)
  }


  replaceUrlId(url: string, id: number | string){
    return url.replace(`:id`, id.toString())
  }


  showSnackBar(message: string, action?: string, duration?: number){
    this.snackBar.open(message, action || 'Cerrar', {
      duration: duration || 2000,
    });
  }

}
