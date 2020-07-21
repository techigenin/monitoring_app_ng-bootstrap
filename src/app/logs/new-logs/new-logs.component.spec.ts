import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLogsComponent } from './new-logs.component';

describe('NewLogsComponent', () => {
  let component: NewLogsComponent;
  let fixture: ComponentFixture<NewLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
