import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SpecieResponse } from '../../assets/types';
import { ApiUrl } from '../../constants/api.url';

@Injectable({
  providedIn: 'root'
})
export class SpecieService {

  private http: HttpClient = inject(HttpClient);

  getAll() {
    return this.http.get<SpecieResponse>(ApiUrl.GET_ALL_SPECIES)
  }
}
