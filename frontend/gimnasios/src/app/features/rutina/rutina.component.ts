import { Component, HostListener, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import { RutinaService } from './rutina.service';
import { MatDividerModule } from '@angular/material/divider';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Ejercicio } from '../../shared/models/ejercicio.model';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiResponse } from '../../shared/models/apiResponse.model';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, CdkDragPreview, CdkDragHandle} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { Rutina } from '../../shared/models/rutina.model';
import { TitleCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from '../../shared/services/utils.service';
import { forkJoin, Observable } from 'rxjs';




@Component({
  selector: 'app-rutina',
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
    CdkDropList, CdkDrag, CdkDragPreview, CdkDragHandle,
    MatIconModule,
    MatExpansionModule,
    TitleCasePipe
  ],
  templateUrl: './rutina.component.html',
  styleUrl: './rutina.component.scss'
})
export class RutinaComponent {

  constructor(
    private rutinaService: RutinaService,
    private utilsService: UtilsService
  ){}

  windowWidth = signal(window.innerWidth);


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth.set(window.innerWidth);
  }

  semana: any = [
    {"name": 'lunes', "number": 1},
    {"name": 'martes', "number": 2},
    {"name": 'miercoles', "number": 3},
    {"name": 'jueves', "number": 4},
    {"name": 'viernes', "number": 5},
    {"name": 'sabado', "number": 6},
    {"name": 'domingo', "number": 7},
  ]
  ejerciciosEliminarArr: any = {
    "dia_1": [],
    "dia_2": [],
    "dia_3": [],
    "dia_4": [],
    "dia_5": [],
    "dia_6": [],
    "dia_7": []
  };

  userRutina!: Rutina[];
  gimnasioEjercicios!: Ejercicio[];
  formRutina: FormGroup = new FormGroup({
    dia_1: new FormArray([]),
    dia_2: new FormArray([]),
    dia_3: new FormArray([]),
    dia_4: new FormArray([]),
    dia_5: new FormArray([]),
    dia_6: new FormArray([]),
    dia_7: new FormArray([])
  })


  ngOnInit(): void{
    this.updateData()
  }


  getFormRutinaDia(diaNum: number){
    return this.formRutina.get(`dia_${diaNum}`) as FormArray;
  }


  addEjercicioDia(diaNum: number){

    this.getFormRutinaDia(diaNum).push(new FormGroup({
      id: new FormControl(null, []),
      fk_id_ejercicio: new FormControl(1, [Validators.required]),
      dia_semana: new FormControl(diaNum, [Validators.required]),
      orden: new FormControl(null, [Validators.required]),
      nro_series: new FormControl(1, [Validators.required]),
      nro_repeticiones: new FormControl(1, [Validators.required]),
    }))

    this.getFormRutinaDia(diaNum).controls.forEach((control: any, index) => {
      control.get('orden').setValue(index)
    })

  }


  drop(event: CdkDragDrop<string[]>, diaNum: number) {
    moveItemInArray(this.getFormRutinaDia(diaNum).controls, event.previousIndex, event.currentIndex);

    this.getFormRutinaDia(diaNum).controls.forEach((control: any, index) => {
      control.get('orden').setValue(index)
    })
  }


  eliminarEjercicio(i: number, diaNum: number){
    this.ejerciciosEliminarArr[`dia_${diaNum}`].push(this.getFormRutinaDia(diaNum).value[i].id)
    this.getFormRutinaDia(diaNum).removeAt(i);
  }


  guardarRutinaDia(diaNum: number){
    if(this.getFormRutinaDia(diaNum).invalid){
      return;
    }

    const rutinaDuplicated = this.getFormRutinaDia(diaNum).value.some((e: Rutina, index: number) => {
      return this.getFormRutinaDia(diaNum).value.some((otherItem: Rutina, otherIndex: number) =>
        otherItem.fk_id_ejercicio === e.fk_id_ejercicio &&
        (otherItem.id === null || e.id === null) &&
        otherIndex !== index
      );
    });


    if(rutinaDuplicated){
      this.utilsService.showSnackBar('Hay un ejercicio duplicado')
      return;
    }

    if(this.getFormRutinaDia(diaNum).value.length > 0){
      this.rutinaService.guardarRutina(this.getFormRutinaDia(diaNum)).subscribe((data: ApiResponse<Rutina>) => {
        if(data.statusCode !== 200){
          return;
        }

        this.updateData()
      })
    }


    if(this.ejerciciosEliminarArr[`dia_${diaNum}`].length <= 0){
      return;
    }



    const rutinasEliminarObservables: Observable<ApiResponse<Rutina>>[] = this.ejerciciosEliminarArr[`dia_${diaNum}`].map((rutina: number) => {
      return this.rutinaService.eliminarRutina(rutina)
    });

    forkJoin(rutinasEliminarObservables).subscribe((data: any) => {
      if(data.statusCode !== 200){
        return;
      }

      this.updateData()
    })


  }


  updateData(){

    this.semana.forEach((e: any) => {
      this.getFormRutinaDia(e.number).clear();
    });

    this.rutinaService.getGimnasioEjercicios().subscribe((data: ApiResponse<Ejercicio[]>) => {

      if(data.statusCode !== 200){
        return;
      }

      this.gimnasioEjercicios = data.data;

      this.rutinaService.getUsuarioRutina().subscribe((data: ApiResponse<Rutina[]>) => {
        this.userRutina = data.data;

        if(data.statusCode !== 200){
          return;
        }

        this.userRutina.forEach((e: Rutina) =>  {
          this.getFormRutinaDia(e.dia_semana).push(new FormGroup({
            id: new FormControl(e.id),
            fk_id_ejercicio: new FormControl(Number(e.fk_id_ejercicio), [Validators.required]),
            dia_semana: new FormControl(e.dia_semana, [Validators.required]),
            orden: new FormControl(e.orden, [Validators.required]),
            nro_series: new FormControl(e.nro_series, [Validators.required]),
            nro_repeticiones: new FormControl(e.nro_repeticiones, [Validators.required]),
          }))
        })

      })
    })

  }

}
