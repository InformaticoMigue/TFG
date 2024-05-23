import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../../constants/api.url';
import { ApiResponseArray, Ticket, TypeTicket } from '../../assets/types';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private httpClient: HttpClient = inject(HttpClient)
  
  delete(id:number){
    return this.httpClient.delete(ApiUrl.DELETE_TICKET(id));
  }

  getAllTypesTicket(){
    return this.httpClient.get<ApiResponseArray<TypeTicket>>(ApiUrl.GET_ALL_TYPE_TICKETS)
  }

  buyTicket(data:any){
    return this.httpClient.post<ApiResponseArray<Ticket>>(ApiUrl.BUY_TICKET_POST,data)
  }
}
