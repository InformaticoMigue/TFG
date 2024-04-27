import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public isLogged: EventEmitter<boolean> = new EventEmitter<boolean>();

  public saveData(key:string,data:string){
    localStorage.setItem(key,data);
  }

  public getData(key:string) {
    return localStorage.getItem(key);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
