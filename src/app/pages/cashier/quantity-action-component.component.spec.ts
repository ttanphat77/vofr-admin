import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityActionComponentComponent } from './quantity-action-component.component';

describe('QuantityActionComponentComponent', () => {
  let component: QuantityActionComponentComponent;
  let fixture: ComponentFixture<QuantityActionComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityActionComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityActionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
