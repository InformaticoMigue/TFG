import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Aclass, ApiResponseArray, EntityResponseArray } from '../../assets/types';
import { ApiUrl } from '../../constants/api.url';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private http: HttpClient = inject(HttpClient);

  public getAll() {
    return this.http.get<ApiResponseArray<Aclass>>(ApiUrl.GET_ALL_CLASSES);
  }
  
}
