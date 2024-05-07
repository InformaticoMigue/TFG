import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../../constants/api.url';
import { ApiResponseArray, Package } from '../../assets/types';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private http: HttpClient = inject(HttpClient);

  public getAll() {
    return this.http.get<ApiResponseArray<Package>>(ApiUrl.GET_ALL_PACKAGES)
  }
  
}
