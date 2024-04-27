import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Aclass, AclassResponse } from '../../assets/types';
import { ApiUrl } from '../../constants/api.url';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private http: HttpClient = inject(HttpClient);

  public getAll(): Observable<AclassResponse> {
    return this.http.get<AclassResponse>(ApiUrl.GET_ALL_CLASSES);
  }
  
}
