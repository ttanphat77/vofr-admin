import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarRenderComponent } from './avatar-render.component';

describe('AvatarRenderComponent', () => {
  let component: AvatarRenderComponent;
  let fixture: ComponentFixture<AvatarRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
