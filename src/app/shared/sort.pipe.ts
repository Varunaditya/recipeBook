import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, property: string): any {
    console.log(1);
    // return value.sort((a, b) => {
    //   if (a.property > b.property) {
    //     return 1;
    //   } else {
    //     return -1;
    //   }
    // } );
  }

}
