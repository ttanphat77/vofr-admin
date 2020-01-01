import { Component, Input } from '@angular/core';

@Component({
  selector: 'quick-access-card',
  templateUrl: './quick-access-card.component.html',
  styleUrls: ['./quick-access-card.component.scss'],
})
export class QuickAccessCardComponent {

  @Input() title: string;
  @Input() icon: string;
  @Input() link: string;

  constructor() { }
}
