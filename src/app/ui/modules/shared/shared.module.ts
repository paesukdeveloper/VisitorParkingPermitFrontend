import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsRendererComponent } from '../../../shared/renderer/actions-renderer.component';
import { TranslateModule } from '../../../shared/translate/translate.module';
import { TranslatePipe } from '../../../shared/translate/translate.pipe';



@NgModule({
  declarations: [ActionsRendererComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,

  ],
  providers: [
    TranslatePipe,
    DatePipe
  ]
})
export class SharedModule { }
