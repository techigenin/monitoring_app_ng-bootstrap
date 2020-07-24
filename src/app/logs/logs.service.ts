import { Injectable } from '@angular/core';
import { Log } from './log.model';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LogsService {
  logArray: Log[] = [];

  selectedLogChanged = new Subject<number>();
  logsChanged = new Subject<Log[]>();

  constructor(private http: HttpClient) {}

  fetchLogs() {
    return this.http.get<Log[]>(environment.baseURL + 'logs').pipe(
      map((logs) => {
        return logs.map((log) => {
          return {
            ...log,
            date: new Date(log.date),
            call: { ...log.call, date: new Date(log.call.date) },
          };
        });
      }),
      tap((logs) => {
        this.logArray = logs;
      })
    );
  }

  get logs() {
    return this.logArray.slice();
  }

  getLog(index: number) {
    return this.logs.find((l) => +index === l.id);
  }

  addLog(newLog: Log): Observable<Log> {
    return this.http.post<Log>(environment.baseURL + 'logs/', newLog).pipe(tap(log => {
      this.logArray.push(log);
      this.logsChanged.next(this.logs);
    }));
  }
}
