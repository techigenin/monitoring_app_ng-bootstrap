import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Comment } from '../comment.model';
import { ConcernLevel } from '../../shared/concern-level.enum';
import { CommentsService } from '../comments.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styles: [`.card { border: 2px solid; }
  .delete-button {cursor: pointer;}`]
})
export class CommentCardComponent implements OnInit, OnDestroy {
  @Input() comment: Comment;
  concernClass: string;
  selectedSub: Subscription;
  isSelected = false;

  constructor(private commentService: CommentsService) {}

  ngOnInit() {
    switch (this.comment.concernLvl) {
      case ConcernLevel.Excellent:
        this.concernClass = 'bg-success';
        break;
      case ConcernLevel.Good:
        this.concernClass = 'bg-primary';
        break;
      case ConcernLevel.Concerning:
        this.concernClass = 'bg-warning';
        break;
      case ConcernLevel.Bad:
        this.concernClass = 'bg-danger';
        break;
      default:
        this.concernClass = 'bg-secondary';
        break;
    }
    this.selectedSub = this.commentService.commentSelected.subscribe(
      (selectedId) => (this.isSelected = this.comment.id === selectedId)
    );
  }

  ngOnDestroy() {
    this.selectedSub?.unsubscribe();
  }

  selected() {
    this.commentService.commentSelected.next(this.comment.id);
  }

  confirmDelete() {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService.deleteComment(this.comment.id);
    }
  }
}
