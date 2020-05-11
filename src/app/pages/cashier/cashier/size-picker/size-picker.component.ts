import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'size-picker',
  templateUrl: './size-picker.component.html',
  styleUrls: ['./size-picker.component.scss']
})
export class SizePickerComponent implements OnInit {
  sizes: any = [];

  @Input() value;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getSizeByProductId(this.value.id).subscribe((rs) => {
      if (rs.data.length) {
        this.sizes = rs.data;
        if(this.value.size == '') {
          this.value.size = this.sizes[0].name;
        }
      }
    })
  }
  change(size) {
    this.value.size = size;
  }

}
