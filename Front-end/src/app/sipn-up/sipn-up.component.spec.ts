import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SipnUpComponent } from './sipn-up.component';

describe('SipnUpComponent', () => {
  let component: SipnUpComponent;
  let fixture: ComponentFixture<SipnUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SipnUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SipnUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
