import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiBriberyPolicyComponent } from './anti-bribery-policy.component';

describe('AntiBriberyPolicyComponent', () => {
  let component: AntiBriberyPolicyComponent;
  let fixture: ComponentFixture<AntiBriberyPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntiBriberyPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiBriberyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
