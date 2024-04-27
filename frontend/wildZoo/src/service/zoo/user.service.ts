import { Injectable, inject } from '@angular/core';
import { User, UserResponse } from '../../assets/types';
import { Observable } from 'rxjs';
import { ApiUrl } from '../../constants/api.url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http:HttpClient = inject(HttpClient)

  public getAllUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(ApiUrl.GET_ALL_USERS)
  }
}
