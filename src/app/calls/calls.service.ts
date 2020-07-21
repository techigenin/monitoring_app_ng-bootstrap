import { Injectable } from '@angular/core';

import { Call } from './call.model';
import { SalesPersonService } from '../shared/sales-person.service';
import { ClientService } from '../shared/client.service';
import { SalesPerson } from '../shared/sales-person.model';
import { Client } from '../shared/client.model';

@Injectable({ providedIn: 'root' })
export class CallsService {
  private callsArray: Call[] = [
    {
      id: 1,
      salesPerson: this.salesPersonService.getSalesPerson(1),
      client: this.clientService.getClient(3),
      date: new Date('05-10-2020'),
      duration: '00:15:23',
    },
    {
      id: 2,
      salesPerson: this.salesPersonService.getSalesPerson(2),
      client: this.clientService.getClient(1),
      date: new Date('04-15-2020'),
      duration: '00:30:46',
    },
    {
      id: 3,
      salesPerson: this.salesPersonService.getSalesPerson(3),
      client: this.clientService.getClient(2),
      date: new Date('06-01-2020'),
      duration: '00:45:01',
    },
  ];

  constructor(private salesPersonService: SalesPersonService, private clientService: ClientService) {}

  get calls() {
    return this.callsArray.slice();
  }

  getCall(id: number) {
    return this.calls.find((c) => c.id === +id);
  }

  addCall(callInfo: Call): number {
    const newCall = {...callInfo, id: this.nextId()};

    this.callsArray.push(newCall);

    return newCall.id;
  }

  nextId(): number {
    return Math.max(...this.callsArray.map(c => c.id)) + 1;
  }
}
