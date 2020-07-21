import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingLogsComponent } from './existing-logs.component';

describe('ExistingLogsComponent', () => {
  let component: ExistingLogsComponent;
  let fixture: ComponentFixture<ExistingLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
