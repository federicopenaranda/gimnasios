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
      title: 'Lorem ipsum dolor sit amet',
      description: '',
      content: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      description: '',
      content: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      description: '',
      content: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      description: '',
      content: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
  ]);



}
