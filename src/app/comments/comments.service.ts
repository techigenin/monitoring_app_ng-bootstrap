import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Comment } from './comment.model';
import { ConcernLevel } from '../shared/concern-level.enum';
import { LogsService } from '../logs/logs.service';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  commentsChanged = new Subject();
  commentSelected = new Subject<number>();

  constructor(private logsService: LogsService) {}

  private commentArray: Comment[] = [
    {
      id: 1,
      log: this.logsService.getLog(1),
      concernLvl: ConcernLevel.Good,
      statement: 'Oh Gee Whiz',
      comment: 'So much good!',
      time: '01:01:01',
    },
    {
      id: 2,
      log: this.logsService.getLog(1),
      concernLvl: ConcernLevel.Excellent,
      statement: 'So exciting',
      comment: 'Even more good!',
      time: '3:01:00',
    },
    {
      id: 3,
      log: this.logsService.getLog(1),
      concernLvl: ConcernLevel.Concerning,
      statement: 'The sun is green',
      comment: 'But why..?',
      time: '04:05:07',
    },
    {
      id: 4,
      log: this.logsService.getLog(2),
      concernLvl: ConcernLevel.Bad,
      statement: 'Something bad',
      comment: 'Oh No!',
      time: '01:03:02',
    },
    {
      id: 5,
      log: this.logsService.getLog(3),
      concernLvl: ConcernLevel.Bad,
      statement: 'Creepy Crawlers',
      comment: '...!',
      time: '03:02:01',
    },
    {
      id: 6,
      log: this.logsService.getLog(3),
      concernLvl: ConcernLevel.Neutral,
      statement: 'And then we had ice cream',
      comment: 'Me too..?',
      time: '04:04:04',
    },
  ];

  get comments() {
    return this.commentArray.slice();
  }

  getCommentsForLog(logId: number): Comment[] {
    return this.comments.filter((comment) => comment.log.id === logId);
  }

  getComment(id: number): Comment {
    return this.comments.find((c) => c.id === +id);
  }

  addUpdateComment(commentInfo: Comment) {
    if (commentInfo.id === 0) {
      return this.addComment(commentInfo);
    } else {
      this.updateComment(commentInfo);
    }
  }

  private addComment(commentInfo: Comment) {
    const newComment: Comment = {
      ...commentInfo,
      id: this.nextId(),
      concernLvl: +commentInfo.concernLvl,
    };

    this.commentArray.push(newComment);

    this.commentsChanged.next();

    return newComment.id;
  }

  private updateComment(commentInfo: Comment) {
    const comment = {...commentInfo, concernLvl: +commentInfo.concernLvl};

    for (const [i, c] of this.commentArray.entries()) {
      if (c.id === comment.id) {
        this.commentArray[i] = comment;
        break;
      }
    }

    this.commentsChanged.next();
  }

  deleteComment(id: number) {
    this.commentArray = this.commentArray.filter((c) => c.id !== id);
    this.commentsChanged.next();
  }

  nextId() {
    return Math.max(...this.comments.map((c) => c.id)) + 1;
  }
}
