import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../../constants/api.url';
import { ApiResponse, ApiResponseArray, Package, User } from '../../assets/types';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private http: HttpClient = inject(HttpClient);

  public getAll() {
    return this.http.get<ApiResponseArray<Package>>(ApiUrl.GET_ALL_PACKAGES)
  }
  
  public find(id:number){
    return this.http.get<ApiResponse<Package>>(ApiUrl.GET_PACKAGE_BY_ID(id))
  }

  public buyPackage(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.post(ApiUrl.BUY_PACKAGE_POST,data,{headers:headers})
  }
}
