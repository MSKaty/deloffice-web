import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPolicyComponent } from './membership-policy.component';

describe('MembershipPolicyComponent', () => {
  let component: MembershipPolicyComponent;
  let fixture: ComponentFixture<MembershipPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
