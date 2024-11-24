import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Suggestion } from '../../shared/models/suggestion.model';
import { catchError, Observable, tap } from 'rxjs';
import { UtilsService } from '../../shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  createSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    // TODO: Add url constant when endpoint is created
        return this.http.post<Suggestion>('', suggestion).pipe(
        tap((newSuggestion: Suggestion) => this.utilsService.log(`added Suggestion w/ id=${newSuggestion.id_suggestion}`)),
        catchError(this.utilsService.handleError<Suggestion>())
        );
       }

}
