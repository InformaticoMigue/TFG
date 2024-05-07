import { Injectable, inject } from '@angular/core';
import { ApiResponseArray, EntityResponseArray, User } from '../../assets/types';
import { Observable } from 'rxjs';
import { ApiUrl } from '../../constants/api.url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http:HttpClient = inject(HttpClient)

  public getAllUsers() {
    return this.http.get<ApiResponseArray<User>>(ApiUrl.GET_ALL_USERS)
  }
}
