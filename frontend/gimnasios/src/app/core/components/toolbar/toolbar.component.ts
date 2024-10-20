import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { SuggestionComponent } from '../../../features/suggestion/suggestion.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    MatListModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  @Input() collapse!: boolean;
  @Output() collapseChange = new EventEmitter<boolean>();
   readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(SuggestionComponent, {
      panelClass: 'suggestion-dialog-container',
    });
}

}
