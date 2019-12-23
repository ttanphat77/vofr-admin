import {Pipe, PipeTransform} from '@angular/core';
import {Product} from "../../models/product.model";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Product[], searchText: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return [];
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.name.toLocaleLowerCase().includes(searchText);
    });
  }
}
