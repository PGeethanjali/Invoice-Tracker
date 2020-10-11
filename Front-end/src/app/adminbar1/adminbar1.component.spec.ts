import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminbar1Component } from './adminbar1.component';

describe('Adminbar1Component', () => {
  let component: Adminbar1Component;
  let fixture: ComponentFixture<Adminbar1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Adminbar1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Adminbar1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
