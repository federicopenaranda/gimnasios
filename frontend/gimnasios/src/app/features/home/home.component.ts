import { TitleCasePipe } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { HomeService } from './home.service';
import { ApiResponse } from '../../shared/models/apiResponse.model';
import { RutinaDiaria } from '../../shared/models/rutina-diaria.model';
import { forkJoin, Observable } from 'rxjs';
import { Registro } from '../../shared/models/registro.model';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    TitleCasePipe,
    MatExpansionModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private homeService: HomeService,
    private utilsService: UtilsService
  ){}


  userRegistros: FormGroup = new FormGroup({});
  userEjercicios!: RutinaDiaria[];
  diasRutina!: number[];
  windowWidth = signal(window.innerWidth);


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth.set(window.innerWidth);
  }

  getUserRegistrosEjercicio(id: number){
    return this.userRegistros.get(`id_registro_${id}`) as FormArray;
  }

  ngOnInit(){

    this.homeService.getRutinaDiaUsuario().subscribe((data: ApiResponse<RutinaDiaria[]>) => {
      if(data.statusCode !== 200){
        return;
      }

      this.userEjercicios = data.data;
      for(let ejercicio of this.userEjercicios){
        this.userRegistros.addControl(`id_registro_${ejercicio.id}`, new FormArray([], [Validators.required]))


        for(let i = 0; i < ejercicio.nro_series; i++){
          this.addRegistro(ejercicio.id, Object.values(this.getUserRegistrosEjercicio(ejercicio.id).controls).length + 1, ejercicio.nro_repeticiones)
        }

      }
    })

  }

  addRegistro(id: number, serie: number, repeticiones?: number){
    this.getUserRegistrosEjercicio(id).push(new FormGroup({
      fk_id_ejercicio: new FormControl(Number(id), [Validators.required]),
      repeticiones: new FormControl(repeticiones || 0, [Validators.required]),
      serie: new FormControl(serie, [Validators.required]),
      peso: new FormControl(1, [Validators.required]),
      fecha: new FormControl(new Date().toISOString().split('T')[0], [])
    }))
  }



  guardarRegistros(){
    if(this.userRegistros.invalid){
      return;
    }

    const registrosObservables: Observable<ApiResponse<Registro>>[] = Object.values(this.userRegistros.controls).flatMap((element: any) => {
      return (element as FormArray).controls.map((element2: any) => {
        element2.fecha = new Date().toISOString().split('T')[0]
        return this.homeService.crearUsuarioRegistro(element2.value);
      });
    });


    forkJoin(registrosObservables).subscribe({
      next: (results) => {
        this.utilsService.showSnackBar('Completaste tu rutina!')
      }
    })
  }

  addSerie(id: number){
    this.userRegistros.addControl(`id_registro_${id}`, new FormArray([], [Validators.required]))
    this.addRegistro(id, Object.keys(this.getUserRegistrosEjercicio(id).controls).length + 1, 1)

  }

  eliminarSerie(id: number, i: number){
    // this.getUserRegistrosEjercicio(id).removeAt(i);
  }

}
