import { Component, signal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';

export type HelpItem = {
  title: string;
  description?: string;
  content: string;
}

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatDividerModule
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {

  helpItems = signal<HelpItem[]>([
    {
      title: '¿Cómo Gestionar la Rutina?',
      description: '',
      content: 'Contenido de ayuda todavía en proceso.'
    },
    {
      title: '¿Cómo registrar un ejercicio?',
      description: '',
      content: 'Contenido de ayuda todavía en proceso.'
    },
    {
      title: '¿Cómo registrar un avance?',
      description: '',
      content: 'Contenido de ayuda todavía en proceso.'
    },
    {
      title: '¿Cómo ver un reporte de mi avance?',
      description: '',
      content: 'Contenido de ayuda todavía en proceso.'
    },
  ]);



}
