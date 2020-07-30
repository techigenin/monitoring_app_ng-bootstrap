import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Comment } from '../comment.model';
import { ConcernLevel } from '../../shared/concern-level.constants';
import { CommentsService } from '../comments.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit, OnDestroy {
  @Input() comment: Comment;
  concernClass: string;
  selectedSub: Subscription;
  isSelected = false;

  constructor(private commentService: CommentsService) {}

  ngOnInit() {
    switch (this.comment.concernLvl) {
      case ConcernLevel.Commendable:
        this.concernClass = 'card-commendable';
        break;
      case ConcernLevel.Caution:
        this.concernClass = 'card-caution';
        break;
      case ConcernLevel.Problematic:
        this.concernClass = 'card-problematic';
        break;
      case ConcernLevel.Severe:
        this.concernClass = 'card-severe';
        break;
      default:
        this.concernClass = '';
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
