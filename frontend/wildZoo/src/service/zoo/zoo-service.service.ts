import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../../constants/api.url';
import { ServiceResponse } from '../../assets/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZooServiceService {

  private http:HttpClient = inject(HttpClient)

  public getAll():Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(ApiUrl.GET_ALL_SERVICES)
  }
  
}
