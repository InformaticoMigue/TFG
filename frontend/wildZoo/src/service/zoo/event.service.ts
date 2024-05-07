import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../../constants/api.url';
import { ApiResponse, ApiResponseArray,Event } from '../../assets/types';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http:HttpClient = inject(HttpClient)

  public getAll() {
    return this.http.get<ApiResponseArray<Event>>(ApiUrl.GET_ALL_EVENTS)
  }

  public find(id:number){
    return this.http.get<ApiResponse<Event>>(ApiUrl.GET_EVENT_BY_ID(id))
  }

}
