import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ContactForm } from '../../assets/types';
import { ApiUrl } from '../../constants/api.url';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private http:HttpClient = inject(HttpClient)

  sendMessage(contactForm:ContactForm){
    return this.http.post(ApiUrl.SEND_CONTACT_MESSAGE,contactForm);
  }
  
}
