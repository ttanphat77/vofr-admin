import { Component, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {
  sizes: any = [];

  @Input() value;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getSizeByProductId(this.value.productId).subscribe((rs) => {
      if (rs.data.length) {
        this.sizes = rs.data;
        // if(this.value.size == '') {
        //   this.value.size = this.sizes[0].name;
        // }
      }
    })
  }
  change(size) {
    this.value.size = size;
  }

}
