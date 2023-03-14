import { Pipe, PipeTransform } from '@angular/core';
// import { TimeAgo } from 'javascript-time-ago';
// import en from 'javascript-time-ago/locale/en';

@Pipe({
  name: 'cutomTimeAgo'
})
export class CustomTimeAgoPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
  
}


