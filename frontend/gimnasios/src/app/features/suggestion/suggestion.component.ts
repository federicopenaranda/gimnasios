import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SuggestionService } from './suggestion.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SuggestionFormService } from './suggestion-form.service';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-suggestion',
    imports: [
        MatInputModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        ReactiveFormsModule,
        MatCardModule
    ],
    templateUrl: './suggestion.component.html',
    styleUrl: './suggestion.component.scss'
})
export class SuggestionComponent {
       suggestionSent = false;

  constructor(
    private _snackBar: MatSnackBar,
    private suggestionService: SuggestionService,
    public formService: SuggestionFormService
  ){}

  readonly dialogRef = inject(MatDialogRef<SuggestionComponent>);

       onSubmit(): void {
    this.suggestionService.createSuggestion(this.formService.form.value)
               .subscribe((result: unknown) => {
                       this.suggestionSent = true;
                       setTimeout(() => this.dialogRef.close({ result: true }), 1800);
                       this.formService.initializeFormGroup();
               });


    this._snackBar.open('Gracias por la sugerencia! 😁', 'Cerrar', { duration: 2000 });
    this.dialogRef.close();

       }

}
