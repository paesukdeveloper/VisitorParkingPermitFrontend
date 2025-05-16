import { Component } from '@angular/core';
import { MenuDetails } from './dummy-data/menuData';
import { TranslateService } from './shared/translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'PermitSystem Customer';
  typeSelected: string;
  modulesDetails: any[] = MenuDetails;
  constructor(public translate: TranslateService) {
    this.typeSelected = 'timer';
    this.translate.use('EN');
  }
}
