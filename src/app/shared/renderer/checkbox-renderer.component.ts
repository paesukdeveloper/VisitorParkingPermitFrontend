import { Component, OnDestroy } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';

import { ICellRendererParams } from 'ag-grid-community';




@Component({

  selector: 'checkbox-renderer',

  template: `<input type="checkbox" class="render1-checkbox" (click)="checkedHandler($event)" [checked]="params.value"/>`,

})

// <input

//       type="checkbox" class="render1-checkbox"

//       (click)="checkedHandler($event)"

//       [checked]="params.value"

//     />

export class CheckboxRenderer {

  public params: any;



  agInit(params: any): void {

    this.params = params;

  }



  checkedHandler(event: any) {

    let checked = event.target.checked;

    let colId = this.params.column.colId;

    this.params.node.setDataValue(colId, checked);

  }

}