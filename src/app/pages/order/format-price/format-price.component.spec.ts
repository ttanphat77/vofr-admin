import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatPriceComponent } from './format-price.component';

describe('FormatPriceComponent', () => {
  let component: FormatPriceComponent;
  let fixture: ComponentFixture<FormatPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
