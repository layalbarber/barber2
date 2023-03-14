import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../services/util.service';
@Pipe({
  name: 'currency'
})

export class CurrencyPipe implements PipeTransform {
  constructor(private util: UtilService) {
  }
 
  transform(value: any): any {
    return this.util.currencyCode+ '-' + this.util.currencySymbol + value;
  }

}
