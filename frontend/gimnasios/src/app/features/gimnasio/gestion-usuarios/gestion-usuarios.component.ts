import { Component, HostListener, signal } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { GestionGimnasioService } from '../gestion-gimnasio.service';
import { ApiResponse } from '../../../shared/models/apiResponse.model';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarUsuarioDialogComponent } from '../editar-usuario-dialog/editar-usuario-dialog.component';
import { FormsModule } from '@angular/forms';
import { CrearUsuarioDialogComponent } from '../crear-usuario-dialog/crear-usuario-dialog.component';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'app-gestion-usuarios',
    imports: [
        MatTableModule,
        MatIconModule,
        MatSlideToggleModule,
        MatButtonModule,
        RouterLink,
        MatTooltipModule,
        MatCardModule,
        FormsModule,
        MatDivider
    ],
    templateUrl: './gestion-usuarios.component.html',
    styleUrl: './gestion-usuarios.component.scss'
})
export class GestionUsuariosComponent {

  constructor(
    private gestionGimnasioService: GestionGimnasioService,
    protected dialog: MatDialog
  ){}


  gimnasioUsers!: User[];
  windowWidth = signal(window.innerWidth);
  deshabilitarUsuarioToggle: boolean = false


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth.set(window.innerWidth);
  }


  ngOnInit(){
    this.updateUsuariosData()
  }


  editarUsuario(userData: User){
    let dialog = this.dialog.open(EditarUsuarioDialogComponent, {
      data: userData,
      height: (this.windowWidth() <= 1100) ? '95vh' : '90vh',
      minWidth: (this.windowWidth() <= 1100) ? '95vw' : '60vw'
    })

    dialog.afterClosed().subscribe((result: any) => {
      if(result && result.dialogResult !== 200){
        return;
      }
      this.updateUsuariosData()
    })
  }

  updateUsuariosData(){
    this.gestionGimnasioService.getGimnasioUsuarios().subscribe((data: ApiResponse<User[]>) => {
      this.gimnasioUsers = data.data;
    })
  }


  deshabilitarUsuario(data: boolean){
    // this.gestionGimnasioService.deshabilitarUsuario(userData).subscribe((data: ApiResponse<User>) => {
    //   this.updateGimnasioData()
    // })
  }


  crearUsuario(){
    let dialog = this.dialog.open(CrearUsuarioDialogComponent, {
      height: (this.windowWidth() <= 1100) ? '95vh' : '90vh',
      minWidth: (this.windowWidth() <= 1100) ? '95vw' : '60vw'
    })

    dialog.afterClosed().subscribe((result: any) => {
      if(result && result.dialogResult !== 200){
        return;
      }
      this.updateUsuariosData()
    })
  }


}