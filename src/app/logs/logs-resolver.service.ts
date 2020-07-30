import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Log } from './log.model';
import { LogsService } from './logs.service';

@Injectable({ providedIn: 'root' })
export class LogsResolverService implements Resolve<Log[]> {

  constructor(private logsService: LogsService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Log[]> {
    return this.logsService.fetchLogs();
  }
}
