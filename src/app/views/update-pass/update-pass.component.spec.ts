import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePassComponent } from './update-pass.component';

describe('UpdatePassComponent', () => {
  let component: UpdatePassComponent;
  let fixture: ComponentFixture<UpdatePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
