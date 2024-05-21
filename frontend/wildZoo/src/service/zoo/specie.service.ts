import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../../constants/api.url';
import { ApiResponse, ApiResponseArray, EntityResponseArray, Specie } from '../../assets/types';

@Injectable({
  providedIn: 'root'
})
export class SpecieService {

  private http: HttpClient = inject(HttpClient);

  getAll() {
    return this.http.get<ApiResponseArray<Specie>>(ApiUrl.GET_ALL_SPECIES)
  }
  find(id:number){
    return this.http.get<ApiResponse<Specie>>(ApiUrl.GET_SPECIE_BY_ID(id))
  }
}
