import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RegexService } from '../../shared/regex.service';
import { CommentsService } from '../comments.service';
import { Log } from '../../logs/log.model';
import { Comment } from '../comment.model';
import { TimestampService } from '../../shared/timestamp.service';
import { LogsService } from '../../logs/logs.service';
import { ConcernLevel } from 'src/app/shared/concern-level.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-add-comment',
  templateUrl: './add-edit-comment.component.html',
  styleUrls: ['./add-edit-comment.component.css'],
  providers: [RegexService, TimestampService],
})
export class AddEditCommentComponent implements OnInit, OnDestroy {
  addCommentForm: FormGroup;
  selectedLog: Log;
  paramsSub: Subscription;
  statement: string;
  comment: string;
  concernLevel: ConcernLevel;
  time: string;

  concernLvls = ConcernLevel.concernLevels;
  commentId = 0;

  constructor(
    private regexService: RegexService,
    private commentsService: CommentsService,
    private timestampService: TimestampService,
    private logService: LogsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe((params) => {
      this.commentId = params.id ? +params.id : 0;
      this.selectedLog = this.logService.getLog(+params.logId);

      if (this.commentId !== 0) {
        const activeComment = this.commentsService.getComment(this.commentId);

        if (!activeComment) {
          this.router.navigate([''], { relativeTo: this.route.parent });
        }

        this.commentId = activeComment.id;
        this.statement = activeComment.statement;
        this.comment = activeComment.comment;
        this.concernLevel = activeComment.concernLvl;
        this.time = activeComment.time;
      }
    });

    this.initForm();
  }

  private initForm() {
    this.addCommentForm = new FormGroup({
      statement: new FormControl(this.statement, [Validators.required]),
      comment: new FormControl(this.comment, [Validators.required]),
      concernLevel: new FormControl(this.concernLevel, [Validators.required]),
      time: new FormControl(this.time, [
        Validators.required,
        Validators.pattern(this.regexService.timeStampRegex),
      ]),
    });
  }

  ngOnDestroy() {
    this.paramsSub?.unsubscribe();
  }

  onAddEditCommentSubmit() {
    const formValues = this.addCommentForm.value;

    const newComment: Comment = {
      id: this.commentId,
      log: this.selectedLog,
      statement: formValues.statement,
      concernLvl: formValues.concernLevel,
      comment: formValues.comment,
      time: this.timestampService.formatTimestamps(formValues.time),
    };

    console.log(newComment);

    this.commentsService.addUpdateComment(newComment);

    this.router.navigate(['show', this.selectedLog.id], {
      relativeTo: this.route.parent,
    });
  }

  cancelAddComment() {
    this.router.navigate(['show', this.selectedLog.id], {
      relativeTo: this.route.parent,
    });
  }
}
