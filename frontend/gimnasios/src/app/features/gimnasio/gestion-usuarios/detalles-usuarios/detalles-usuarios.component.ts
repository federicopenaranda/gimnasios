import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { GestionGimnasioService } from '../../gestion-gimnasio.service';
import { ApiResponse } from '../../../../shared/models/apiResponse.model';
import { User } from '../../../../shared/models/user.model';

@Component({
    selector: 'app-detalles-usuarios',
    imports: [
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        ClipboardModule,
        MatTooltipModule
    ],
    templateUrl: './detalles-usuarios.component.html',
    styleUrl: './detalles-usuarios.component.scss'
})
export class DetallesUsuariosComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private gestionGimnasioService: GestionGimnasioService
  ){}


  userData!: User;
  id!: number;


  ngOnInit(): void{
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id') || '';
      this.gestionGimnasioService.getUsuario(this.id).subscribe((data: ApiResponse<User>) => {
        this.userData = data.data;
      })
    })
  }

}
