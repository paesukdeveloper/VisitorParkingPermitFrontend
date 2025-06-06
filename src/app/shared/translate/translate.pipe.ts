// app/translate/translate.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate',
  pure: false, // add in this line, update value when we change language
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: string): any {
    if (!value) {
      return;
    }
    return this.translate.instant(value);
  }
}
