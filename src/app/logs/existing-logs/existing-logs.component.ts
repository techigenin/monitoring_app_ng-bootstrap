import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Comment } from '../../comments/comment.model';
import { LogsService } from '../logs.service';
import { SalesPersonService } from '../../shared/sales-person.service';
import { ClientService } from '../../shared/client.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-existing-logs',
  templateUrl: './existing-logs.component.html',
  styleUrls: ['./existing-logs.component.css'],
})
export class ExistingLogsComponent implements OnInit, OnDestroy {
  logOptions: { id: number; date: Date; value: string }[];
  comments: Comment[] = [];
  logsSub: Subscription;

  @ViewChild('form') form: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private logService: LogsService,
    private salesPersonService: SalesPersonService
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

  getLogOptions() {
    const options: { id: number; date: Date; value: string }[] = [];

    for (const log of this.logService.logs) {
      const date = log.call.date.toLocaleString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      });
      const duration = log.call.duration;
      const spName = this.salesPersonService.getSalesPersonName(
        log.call.salesPerson.id
      );
      const cliName = this.clientService.getClientName(log.call.client.id);
      const val = `${date} - ${duration} - ${spName} --> ${cliName}`;

      options.push({ id: log.id, date: log.call.date, value: val });
    }

    options.sort((a, b) => (a.date > b.date ? 1 : -1)).reverse();

    return options;
  }

  selectLog() {
    const logId = +this.form.value.logSelector;

    this.logService.selectedLogChanged.next(logId);
    this.router.navigate(['show', logId], { relativeTo: this.route });
  }
}
