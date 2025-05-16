import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferLoginDataService {
private data: any = {};
  constructor() { }

  setLoginData(newData: any) {
    this.data = newData;
  }

  getLoginData() {
    return this.data;
  }

  clearLoginData() {
    this.data = {};
  }
}
