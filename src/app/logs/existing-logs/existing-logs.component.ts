import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Comment } from '../../comments/comment.model';
import { LogsService } from '../logs.service';
import { HelperMethodsService } from '../../shared/helper-methods.service';

@Component({
  selector: 'app-existing-logs',
  templateUrl: './existing-logs.component.html',
  styleUrls: ['./existing-logs.component.css']
})
export class ExistingLogsComponent implements OnInit, OnDestroy {
  logOptions: { id: number; date: Date; value: string }[];
  comments: Comment[] = [];
  logsSub: Subscription;

  @ViewChild('form') form: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logService: LogsService
  ) {}

  ngOnInit(): void {
    this.logsSub = this.logService.logsChanged.subscribe(() => {
      this.logOptions = this.getLogOptions();
    });

    this.logOptions = this.getLogOptions();
  }

  ngOnDestroy() {
    this.logsSub?.unsubscribe();
  }

  selectLog() {
    const logId = +this.form.value.logSelector;

    this.logService.selectedLogChanged.next(logId);
    this.router.navigate(['show', logId], { relativeTo: this.route });
  }

  private getLogOptions() {
    const options: { id: number; date: Date; value: string }[] = [];

    for (const log of this.logService.logs) {
      const date = log.call.date;
      const dateString  = log.call.date.toLocaleString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      });
      const duration = log.call.duration;
      const uName = HelperMethodsService.getFullName(log.user);
      const spName = HelperMethodsService.getFullName(log.call.salesPerson);
      const cliName = HelperMethodsService.getFullName(log.call.client);
      const value = `${dateString} - ${duration} - ${uName}: ${spName} --> ${cliName}`;

      options.push({ id: log.id, date, value });
    }

    options.sort((a, b) => (a.date > b.date ? 1 : -1)).reverse();

    return options;
  }
}
