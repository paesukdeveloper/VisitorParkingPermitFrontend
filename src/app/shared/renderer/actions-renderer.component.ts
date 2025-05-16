// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'app-actions-renderer',
  template: `
  <a *ngIf="isEdit" class="action-btn edit-color" (click)="onEditClick($event)" data-tooltip="Edit" data-tooltip-location="left"><i class="fa fa-edit"></i></a>
  <a *ngIf="isSchedule" class="action-btn edit-color" (click)="onScheduleClick($event)" data-tooltip="Schedule" data-tooltip-location="left"><i class="fa fa-calendar-check"></i></a>
  <a *ngIf="isCopy" class="action-btn archive-color"  (click)="onCopyClick($event)"
      data-tooltip="Copy" data-tooltip-location="left"><i class="fa fa-copy"></i></a>
  <a *ngIf="isEye" class="action-btn archive-color" (click)="onViewClick($event)" data-tooltip="View" data-tooltip-location="left"><i class="fa fa-eye"></i></a>
  <a *ngIf="isPaymentHistory" class="action-btn archive-color" data-tooltip="Payment History" data-tooltip-location="left"><i class="fa-solid fa-money-bill-1-wave"></i></a>
      <a *ngIf="isDownload" class="action-btn archive-color" (click)="onDownloadClick($event)" data-tooltip="Download" data-tooltip-location="left"><i class="fa fa-download"></i></a>

  <a *ngIf="isLockUnlock " class="action-btn edit-color" (click)="onLockUplockClick($event)" data-tooltip="Unlock" data-tooltip-location="left"><i class="fa fa-lock"></i></a>
  <!-- <a *ngIf="isLockUnlock " class="action-btn edit-color" (click)="onLockUplockClick($event)"  data-tooltip="Lock" data-tooltip-location="left"><<i class="fa fa-lock"></i></a> -->
  <a *ngIf="isLocation" class="action-btn edit-color" data-tooltip="Live Tracking" data-tooltip-location="left"><i class="fa fa-location-arrow"></i></a>
  <a *ngIf="isClearCase" class="action-btn edit-color" data-tooltip="Clear Case" data-tooltip-location="left"><i class="fa-solid fa-magnifying-glass-minus"></i></a>


      

  <a *ngIf="isDelete" class="action-btn archive-color" (click)="onDeleteClick($event)" data-tooltip="Delete" data-tooltip-location="left"><i class="fa fa-archive"></i></a>
  <a *ngIf="isCanceltrip" data-tooltip="Cancel Trip" data-tooltip-location="left" class="ico1 canceltripico action-btn archive-color"></a>

  <a *ngIf="isEndtrip" data-tooltip="End Trip" data-tooltip-location="left" class="ico1 endtripico action-btn archive-color"></a>
  <a *ngIf="isCalendar" class="action-btn edit-color" (click)="onCalendarClick($event)" data-tooltip="Schedule Trip" data-tooltip-location="left"><i class="fa fa-calendar"></i></a>

  <a *ngIf="isPDF" class="action-btn edit-color" (click)="onPDFClick($event)" data-tooltip="PDF" data-tooltip-location="left"><i class="fa fa-file-pdf"></i></a>

  <a *ngIf="isNote" ngClass="cssClass" class="action-btn edit-color" (click)="onNoteClick($event)" data-tooltip="Note" data-tooltip-location="left"><i class="fa fa-sticky-note"></i></a>

  <a *ngIf="isSummary" ngClass="cssClass" class="action-btn edit-color" (click)="onSummaryClick($event)" data-tooltip="Trip Summary" data-tooltip-location="left"><i class="fa fa-file-text"></i></a>

  <span *ngIf="isIncident" data-tooltip="Incident" data-tooltip-location="left" class="ico1 complaintico action-btn archive-color"></span>

  <span *ngIf="isTerminat" data-tooltip="Terminate" data-tooltip-location="left" class="ico1 terminatico action-btn archive-color"></span>
       
  <label *ngIf="isToggle" class="switch"
      data-tooltip="Active" data-tooltip-location="left">
      <input type="checkbox" checked (change)="onCheckboxChange($event)">
      <span class="slider round"></span>
  </label>

  <label *ngIf="isTnCToggle" class="switch">
      <input type="checkbox" [checked]="params?.data?.isAcceptTermsandCondition" (change)="onCheckboxChange($event)">
      <span class="slider round"></span>
  </label>

  <a *ngIf="isOk" [ngClass]="{'disabled' : params?.data?.status === 'Pending' || params?.data?.status === 'Expired' || params?.isOkClass}" [attr.data-tooltip]="params?.data?.isVoucherBook ? 'Ok' : null" data-tooltip-location="left" class="action-btn ok-btn" (click)="onOkClick($event)"><i class="fa fa-check"></i></a>

  <a *ngIf="isCancel" class="action-btn archive-color" [attr.data-tooltip]="params?.data?.status === 'Pending' ? 'Cancel' : null" data-tooltip-location="left"  (click)="onCancelClick($event)"><i class="fa fa-close"></i></a>

    `
})

export class ActionsRendererComponent implements ICellRendererAngularComp {
  params: any;
  width: any;
  label: string | undefined;
  isEdit!: boolean;
  isClearCase!: boolean;
  isDelete!: boolean;
  isToggle!: boolean;
  isCopy!: boolean;
  isLockUnlock!: boolean;
  isDownload!: boolean;
  isEye!: boolean;
  isPaymentHistory!: boolean;
  isIncident!: boolean;
  isCalendar!: boolean;
  isLocation!: boolean;
  isEndtrip!: boolean;
  isCanceltrip!: boolean;
  isSchedule!: boolean;
  isPDF!: boolean;
  isNote!: boolean;
  isSummary!: boolean;
  isTerminat!: boolean;
  isOk!:boolean;
  isCancel!:boolean;
  isTnCToggle!: boolean;

  cssClass = '';

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
    this.cssClass = this.params.cssClass ? this.params.cssClass : '';
    this.isEdit = this.params.isEdit ? this.params.isEdit : false;
    this.isClearCase = this.params.isClearCase ? this.params.isClearCase : false;
    this.isDelete = this.params.isDelete ? this.params.isDelete : false;
    this.isToggle = this.params.isToggle ? this.params.isToggle : false;
    this.isCopy = this.params.isCopy ? this.params.isCopy : false;
    this.isLockUnlock = this.params.isLockUnlock ? this.params.isLockUnlock : false;
    this.isDownload = this.params.isDownload ? this.params.isDownload : false;
    this.isSchedule = this.params.isSchedule ? this.params.isSchedule : false;
    this.isEye = this.params.isEye ? this.params.isEye : false;
    this.isPaymentHistory = this.params.isPaymentHistory ? this.params.isPaymentHistory : false;
    this.isIncident = this.params.isIncident ? this.params.isIncident : false;
    this.isCalendar = this.params.isCalendar ? this.params.isCalendar : false;
    this.isPDF = this.params.isPDF ? this.params.isPDF : false;
    this.isNote = this.params.isNote ? this.params.isNote : false;
    this.isCanceltrip = this.params.isCanceltrip ? this.params.isCanceltrip : false;
    this.isEndtrip = this.params.isEndtrip ? this.params.isEndtrip : false;
    this.isLocation = this.params.isLocation ? this.params.isLocation : false;
    this.isSummary = this.params.isSummary ? this.params.isSummary : false;
    this.isTerminat = this.params.isTerminat ? this.params.isTerminat : false;
    this.isOk = this.params.isOk ? this.params.isOk : false;
    this.isCancel = this.params.isCancel ? this.params.isCancel : false;
    this.isTnCToggle = this.params.isTnCToggle ? this.params.isTnCToggle : false;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onEditClick($event: any) {
    if (this.params.onEditClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onEditClick(params);

    }
  }

  onNoteClick($event: any) {
    if (this.params.onNoteClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onNoteClick(params);

    }
  }

  onSummaryClick($event: any) {
    if (this.params.onSummaryClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onSummaryClick(params);

    }
  }

  onViewClick($event: any) {
    if (this.params.onViewClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onViewClick(params);

    }
  }

  onPDFClick($event: any) {
    if (this.params.onPDFClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onPDFClick(params);

    }
  }

  onLockUplockClick($event: any) {
    if (this.params.onLockUplockClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onLockUplockClick(params);

    }
  }

  onCopyClick($event: any) {
    if (this.params.onCopyClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onCopyClick(params);

    }
  }
  onCheckboxChange($event: any) {
    if (this.params.onCheckboxChange instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onCheckboxChange(params);

    }
  }

  onDeleteClick($event: any) {
    if (this.params.onDeleteClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onDeleteClick(params);

    }
  }

  onCalendarClick($event: any) {
    if (this.params.onCalendarClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onCalendarClick(params);

    }
  }

  onScheduleClick($event: any) {
    if (this.params.onScheduleClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onScheduleClick(params);
    }

  }

  onTerminatClick($event: any) {
    if (this.params.onScheduleClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onTerminatClick(params);
    }

  }

  onOkClick($event: any) {
    if (this.params.onOkClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onOkClick(params);
    }

  }

  onCancelClick($event: any) {
    if (this.params.onCancelClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onCancelClick(params);
    }

  }

  onDownloadClick($event: any) {
    if (this.params.onDownloadClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onDownloadClick(params);

    }
  }

}

