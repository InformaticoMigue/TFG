import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../../constants/api.url';
import { ApiResponseArray, EntityResponseArray } from '../../assets/types';

@Injectable({
  providedIn: 'root'
})
export class SpecieService {

  private http: HttpClient = inject(HttpClient);

  getAll() {
    return this.http.get<ApiResponseArray<Event>>(ApiUrl.GET_ALL_SPECIES)
  }
}
