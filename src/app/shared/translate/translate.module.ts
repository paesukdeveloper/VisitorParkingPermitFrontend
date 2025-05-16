import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TRANSLATION_PROVIDERS } from './translations';
import { TranslateService } from './translate.service';
import { TranslatePipe } from './translate.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
  providers: [
    TRANSLATION_PROVIDERS, TranslateService]
})
export class TranslateModule { }
