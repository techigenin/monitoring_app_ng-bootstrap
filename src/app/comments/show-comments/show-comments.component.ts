import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Log } from '../../logs/log.model';
import { Comment } from '../comment.model';
import { LogsService } from '../../logs/logs.service';
import { CommentsService } from '../comments.service';
import { TimestampService } from 'src/app/shared/timestamp.service';

@Component({
  selector: 'app-show-comments',
  templateUrl: './show-comments.component.html',
  styleUrls: ['./show-comments.component.css'],
  providers: [TimestampService],
})
export class ShowCommentsComponent implements OnInit, OnDestroy {
  comments: Comment[];
  selectedCommentId: number;
  selectedLog: Log;

  paramsSub: Subscription;
  commentsSub: Subscription;
  addingSub: Subscription;
  selectedCommentSub: Subscription;
  selectedLogSub: Subscription;

  constructor(
    private timestampService: TimestampService,
    private commentsService: CommentsService,
    private logService: LogsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe( params => {
      this.selectedLog = this.logService.getLog(+params.id);
    });
    this.selectedLogSub = this.logService.selectedLogChanged.subscribe((selectedLog) => {
      this.setComments(this.commentsService.getCommentsForLog(selectedLog));
    });
    this.commentsSub = this.commentsService.commentsChanged.subscribe(() => {
      this.setComments(this.commentsService.getCommentsForLog(this.selectedLog.id));
    });
    this.selectedCommentSub = this.commentsService.commentSelected.subscribe(
      (selectedId) => {
        this.selectedCommentId = selectedId;
      }
    );

    // this.setComments(this.commentsService.getCommentsForLog(this.selectedLog.id));
  }

  ngOnDestroy() {
    this.paramsSub?.unsubscribe();
    this.commentsSub?.unsubscribe();
    this.addingSub?.unsubscribe();
    this.selectedCommentSub?.unsubscribe();
    this.selectedLogSub?.unsubscribe();
  }

  addComment() {
    this.router.navigate(['comments', 'add', this.selectedLog.id], {relativeTo: this.route.parent});
  }

  editComment() {
    this.router.navigate(['comments', 'edit', this.selectedLog.id, this.selectedCommentId], {relativeTo: this.route.parent});
  }

  cancelEdit() {
    this.selectedCommentId = null;
    this.commentsService.commentSelected.next(null);
  }

  private setComments(comments: Comment[]) {
    this.comments = comments;
    this.comments
      .sort((a, b) =>
        this.timestampService.compareTimestampStrings(a.time, b.time)
      )
      .reverse();
  }
}
