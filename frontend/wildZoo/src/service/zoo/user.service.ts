import { Injectable, inject } from '@angular/core';
import { ApiResponse, ApiResponseArray, CreditCard, EntityResponseArray, User } from '../../assets/types';
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

  public find(id:number) {
    return this.http.get<ApiResponse<User>>(ApiUrl.GET_USER_BY_ID(id))
  }

  public updateCreditCard(data:any){
    return this.http.post<ApiResponse<CreditCard>>(ApiUrl.UPDATE_CREDIT_CARD_POST,data)    
  }

  public updateUser(data:any){
    return this.http.post<ApiResponse<User>>(ApiUrl.UPDATE_USER_POST,data)
  }

  checkUsernameAvailability(username: string) {
    console.log(ApiUrl.GET_USER_BY_USERNAME(username));
    
    return this.http.get<ApiResponse<User>>(ApiUrl.GET_USER_BY_USERNAME(username));
  }
  
}
