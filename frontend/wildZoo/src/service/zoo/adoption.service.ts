import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../../constants/api.url';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  private http: HttpClient = inject(HttpClient)

  public isAnimalAdoption(idAnimal: number): Observable<boolean> {
    return this.http.get<boolean>(ApiUrl.GET_ADOPTION_AVAILABLE_BY_ID(idAnimal))
      .pipe(
        map(response => true),
        catchError(error => {
          return of(false);
        })
      );
  }
}
