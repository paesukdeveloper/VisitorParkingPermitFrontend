import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private data: any = {};
  constructor() { }

  setData(newData: any) {
    this.data = newData;
  }

  getData() {
    return this.data;
  }

  clearData() {
    this.data = {};
  }
}
