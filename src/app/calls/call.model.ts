import { SalesPerson } from '../shared/sales-person.model';
import { Client } from '../shared/client.model';

export class Call {
  constructor(
    public id: number,
    public date: Date,
    public duration: string,
    public salesPerson: SalesPerson,
    public client: Client
  ) {}
}
