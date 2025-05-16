
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccessIdentifierDetails } from '../../../models/accessIdentifier';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonDataPassingService {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  @Output() dataChangeObserver: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) {
    
  }
  private _jsonURL = '../assets/controlInformation.json';

  private moduleDetail = new BehaviorSubject('');
  currentModule = this.moduleDetail.asObservable();
  
  private activeDetail = new BehaviorSubject('');
  activeModule = this.activeDetail.asObservable();

  private data = new BehaviorSubject<any>(null);;
  transactionData = this.data.asObservable();

  sendData(value: any) {
    this.moduleDetail.next(value);
  }
  setActiveClass(value: any) {
    this.activeDetail.next(value)
  }
  sendTransactionData(value: any) {
    this.data.next(value)
  }

  getUserAccess(accessIdentifier:any) {
    let pageWiseAccess: AccessIdentifierDetails = {};
    const userAccess = JSON.parse(localStorage.getItem('userAccess') ?? '')
    if (userAccess) {
      pageWiseAccess = userAccess.find((a:any) => a.accessIdentifier == accessIdentifier);
    }
    return pageWiseAccess;
  }

  async getControlInfo() {
    this.getJSON().subscribe((data:any) => {
      return data
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

}
