import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAccountButtonComponent } from './active-account-button.component';

describe('ActiveAccountButtonComponent', () => {
  let component: ActiveAccountButtonComponent;
  let fixture: ComponentFixture<ActiveAccountButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveAccountButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAccountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
