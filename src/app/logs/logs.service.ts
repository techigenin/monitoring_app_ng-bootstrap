import { Injectable } from '@angular/core';
import { Log } from './log.model';
import { Subject } from 'rxjs';

import { CallsService } from '../calls/calls.service';
import { UsersService } from '../users/users.service';

@Injectable({ providedIn: 'root' })
export class LogsService {
  logArray: Log[] = [
    { id: 1, call: this.callService.getCall(2), date: new Date('01-01-2019'), user: this.userService.getUser(1) },
    { id: 4, call: this.callService.getCall(3), date: new Date('12-01-2019'), user: this.userService.getUser(2) },
    { id: 2, call: this.callService.getCall(1), date: new Date('02-03-2020'), user: this.userService.getUser(1) },
    { id: 3, call: this.callService.getCall(3), date: new Date('12-01-2019'), user: this.userService.getUser(3) },
  ];
  selectedLogChanged = new Subject<number>();
  logsChanged = new Subject();

  constructor(private callService: CallsService, private userService: UsersService) {}

  get logs() {
    return this.logArray.slice();
  }

  getLog(index: number) {
    const log = this.logs.find((l) => +index === l.id);

    return log;
  }

  addLog(logInfo: Log): number {
    const newLog = {...logInfo, id: this.nextId()};

    this.logArray.push(newLog);

    this.logsChanged.next();
    return newLog.id;
  }

  nextId(): number {
    return Math.max(...this.logArray.map(l => l.id)) + 1;
  }
}
