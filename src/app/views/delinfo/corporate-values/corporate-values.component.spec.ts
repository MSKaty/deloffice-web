import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateValuesComponent } from './corporate-values.component';

describe('CorporateValuesComponent', () => {
  let component: CorporateValuesComponent;
  let fixture: ComponentFixture<CorporateValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
