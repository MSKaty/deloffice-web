import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPolicyComponent } from './delivery-policy.component';

describe('DeliveryPolicyComponent', () => {
  let component: DeliveryPolicyComponent;
  let fixture: ComponentFixture<DeliveryPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
