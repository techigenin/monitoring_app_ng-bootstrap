import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { User } from '../users/user.model';
import { Log } from '../logs/log.model';
import { Call } from '../calls/call.model';
import { Client } from './client.model';
import { SalesPerson } from './sales-person.model';
import { UsersService } from '../users/users.service';
import { LogsService } from '../logs/logs.service';
import { CallsService } from '../calls/calls.service';
import { ClientService } from './client.service';
import { SalesPersonService } from './sales-person.service';

@Injectable({ providedIn: 'root' })
export class UsersResolverService implements Resolve<User[]> {
  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usersService.fetchUsers();
  }
}

@Injectable({ providedIn: 'root' })
export class LogsResolverService implements Resolve<Log[]> {
  constructor(private logsService: LogsService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.logsService.fetchLogs();
  }
}

@Injectable({ providedIn: 'root' })
export class CallResolverService implements Resolve<Call[]> {
  constructor(private callsService: CallsService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.callsService.fetchCalls();
  }
}

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<Client[]> {
  constructor(private clientService: ClientService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.clientService.fetchClients();
  }
}

@Injectable({ providedIn: 'root' })
export class SalesPersonResolver implements Resolve<SalesPerson[]> {
  constructor(private salesPersonService: SalesPersonService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.salesPersonService.fetchSalesPersons();
  }
}
