import { Injectable, inject } from '@angular/core';
import { Animal } from '../../assets/types';
import { Observable } from 'rxjs';
import { ApiUrl } from '../../constants/api.url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private http: HttpClient = inject(HttpClient);

  public getAnimals(): Observable<Animal>  {
    return this.http.get<Animal>(ApiUrl.GET_ALL_ANIMALS);
  }

}
