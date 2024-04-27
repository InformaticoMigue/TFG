import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  private readonly key: string = "123";
  private readonly iv: string = "0123456789abcdef";
  constructor() {}

  public encryptData(data: string) {
    const encryptedData = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(this.key), {
      iv: CryptoJS.enc.Utf8.parse(this.iv)
    }).toString();
    return encryptedData;
  }

  public decrypt(encryptedData: string) {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(this.key), {
      iv: CryptoJS.enc.Utf8.parse(this.iv)
    }).toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
}
