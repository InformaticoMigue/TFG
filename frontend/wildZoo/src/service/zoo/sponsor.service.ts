import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../../constants/api.url';
import { Observable, catchError, map, of } from 'rxjs';
import { SponsorAnimal, ApiResponse, Sponsor, ApiResponseArray } from '../../assets/types';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  private http: HttpClient = inject(HttpClient)

  public isAnimalAdoption(idAnimal: number) {
    return this.http.get<SponsorAnimal>(ApiUrl.GET_SPONSOR_AVAILABLE_BY_ID(idAnimal));
  }

  public savedAdoption(data:any){
    return this.http.post<ApiResponse<Sponsor>>(ApiUrl.SAVE_SPONSORED_POST,data);
  }

  public getAllSponsors(){
    return this.http.get<ApiResponseArray<Sponsor>>(ApiUrl.GET_ALL_SPONSORS);
  }

  public getAllAvailableAnimals(){
    return this.http.get<ApiResponseArray<SponsorAnimal>>(ApiUrl.GET_ALL_AVAILABLE_SPONSORS_ANIMAL)
  }
}
