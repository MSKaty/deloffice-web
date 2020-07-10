import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacynsecurityComponent } from './privacynsecurity.component';

describe('PrivacynsecurityComponent', () => {
  let component: PrivacynsecurityComponent;
  let fixture: ComponentFixture<PrivacynsecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacynsecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacynsecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
