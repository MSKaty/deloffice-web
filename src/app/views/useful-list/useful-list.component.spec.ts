import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefulListComponent } from './useful-list.component';

describe('UsefulListComponent', () => {
  let component: UsefulListComponent;
  let fixture: ComponentFixture<UsefulListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsefulListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsefulListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
