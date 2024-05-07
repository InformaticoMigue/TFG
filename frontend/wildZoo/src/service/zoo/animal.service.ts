import { Injectable, inject } from '@angular/core';
import { Animal, ApiResponse, ApiResponseArray } from '../../assets/types';
import { Observable } from 'rxjs';
import { ApiUrl } from '../../constants/api.url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private http: HttpClient = inject(HttpClient);

  public getAnimals() {
    return this.http.get<ApiResponseArray<Animal>>(ApiUrl.GET_ALL_ANIMALS);
  }

  public find(id:number) {
    return this.http.get<ApiResponse<Animal>>(ApiUrl.GET_ANIMAL_BY_ID(id));
  }

}
