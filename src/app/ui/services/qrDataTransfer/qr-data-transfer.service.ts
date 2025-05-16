import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrDataTransferService {
  private data: any = {};
  constructor() { }

  setQRData(newData: any) {
    this.data = newData;
  }

  getQRData() {
    return this.data;
  }

  clearQRData() {
    this.data = {};
  }
}
