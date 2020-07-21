import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCommentComponent } from './add-edit-comment.component';

describe('AddCommentComponent', () => {
  let component: AddEditCommentComponent;
  let fixture: ComponentFixture<AddEditCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
