import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../../constants/api.url';
import { Observable } from 'rxjs';
import { ApiResponse, EntityResponseArray, Service } from '../../assets/types';

@Injectable({
  providedIn: 'root'
})
export class ZooServiceService {

  private http:HttpClient = inject(HttpClient)

  public getAll() {
    return this.http.get<ApiResponse<Service>>(ApiUrl.GET_ALL_SERVICES)
  }
  
}
