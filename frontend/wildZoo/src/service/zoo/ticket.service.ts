import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../../constants/api.url';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private httpClient: HttpClient = inject(HttpClient)
  
  delete(id:number){
    return this.httpClient.delete(ApiUrl.DELETE_TICKET(id));
  }
}
