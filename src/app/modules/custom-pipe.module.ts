import { CurrencyPipe } from './../pipes/currency.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinuteSecondsPipe } from '../pipes/minute-seconds.pipe';
import { CustomTimeAgoPipe } from '../pipes/cutom-time-ago.pipe';

@NgModule({
  declarations: [
    MinuteSecondsPipe,
    CustomTimeAgoPipe,
    CurrencyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MinuteSecondsPipe,
    CustomTimeAgoPipe,
    CurrencyPipe
  ]
})
export class CustomPipeModule { }
