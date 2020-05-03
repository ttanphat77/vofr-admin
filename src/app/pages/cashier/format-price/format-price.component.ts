import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'format-price',
  templateUrl: './format-price.component.html',
  styleUrls: ['./format-price.component.scss']
})
export class FormatPriceComponent implements OnInit {

  @Input() value;

  constructor() {
  }

  ngOnInit() {
  }

  returnPrice() {
    return this.value
  }

}
