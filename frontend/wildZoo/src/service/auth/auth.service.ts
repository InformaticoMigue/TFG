import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private currentUser = new BehaviorSubject<any>(this.getUserData());

  constructor(
    private httpClient: HttpClient,
    private storage:StorageService,
  ) {}

  private hasToken(): boolean {
    return !!this.storage.getData('jwtToken');
  }

  private getUserData(): any {
    const token = this.storage.getData('jwtToken');
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    
    return {
      id: decodedToken.id,
    };
  }


  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<{ jwt: string }>(`http://localhost:8080/authenticate`, { username, password })
    .pipe(map(response => {
      this.storage.saveData('jwtToken', response.jwt);
      this.currentUser.next(this.getUserData());
      this.isLoggedIn.next(true);
        return response.jwt;
      }));
  }
  
  logout(): void {
    this.storage.removeData('jwtToken');
    this.isLoggedIn.next(false);
    this.currentUser.next(null);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  get currentUser$(): Observable<any> {
    return this.currentUser.asObservable();
  }
}
