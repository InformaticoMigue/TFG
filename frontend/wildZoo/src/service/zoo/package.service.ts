import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PackageResponse } from '../../assets/types';
import { ApiUrl } from '../../constants/api.url';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private http: HttpClient = inject(HttpClient);

  public getAll() {
    return this.http.get<PackageResponse>(ApiUrl.GET_ALL_PACKAGES)
  }
  
}
