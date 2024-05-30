import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../../constants/api.url';
import { Observable, catchError, map, of } from 'rxjs';
import { Adoption, SponsorAnimal, ApiResponse } from '../../assets/types';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  private http: HttpClient = inject(HttpClient)

  public isAnimalAdoption(idAnimal: number) {
    return this.http.get<SponsorAnimal>(ApiUrl.GET_SPONSOR_AVAILABLE_BY_ID(idAnimal));
  }

  public savedAdoption(data:any){
    return this.http.post<ApiResponse<Adoption>>(ApiUrl.SAVE_SPONSORED_POST,data);
  }
}
