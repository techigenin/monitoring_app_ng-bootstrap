import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Comment } from './comment.model';
import { ConcernLevel } from '../shared/concern-level.constants';
import { LogsService } from '../logs/logs.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private commentArray: Comment[] = [];

  commentsChanged = new Subject<Comment[]>();
  commentSelected = new Subject<number>();

  constructor(private http: HttpClient, private logsService: LogsService) {}

  fetchComments() {
    return this.http.get<Comment[]>(environment.baseURL + 'comments').pipe(
      tap((comments: Comment[]) => {
        console.log(comments);
        this.commentArray = comments;
        this.commentsChanged.next(comments);
      })
    );
  }

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

    this.commentsChanged.next(this.comments);

    return newComment.id;
  }

  private updateComment(commentInfo: Comment) {
    const comment = { ...commentInfo, concernLvl: +commentInfo.concernLvl };

    for (const [i, c] of this.commentArray.entries()) {
      if (c.id === comment.id) {
        this.commentArray[i] = comment;
        break;
      }
    }

    this.commentsChanged.next(this.comments);
  }

  deleteComment(id: number) {
    this.commentArray = this.commentArray.filter((c) => c.id !== id);
    this.commentsChanged.next();
  }

  nextId() {
    return Math.max(...this.comments.map((c) => c.id)) + 1;
  }
}
