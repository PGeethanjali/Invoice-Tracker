import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminbar2Component } from './adminbar2.component';

describe('Adminbar2Component', () => {
  let component: Adminbar2Component;
  let fixture: ComponentFixture<Adminbar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Adminbar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Adminbar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
