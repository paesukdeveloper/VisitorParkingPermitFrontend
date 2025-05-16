// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'app-button-renderer',
  template: `
    <a [class]="cssClass" (click)="onClick($event)">{{label}}</a>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {
  params: any;
  width: any;
  label: string | undefined;
  cssClass = '';
  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
    this.cssClass = this.params.cssClass ? this.params.cssClass :'';
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
}