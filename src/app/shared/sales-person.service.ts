import { Injectable } from '@angular/core';
import { SalesPerson } from './sales-person.model';

@Injectable({ providedIn: 'root' })
export class SalesPersonService {
  private salesPersonArray: SalesPerson[] = [
    {
      id: 1,
      firstName: 'Lewis',
      lastName: 'Wetzel',
      phoneNumber: '190-319-0609',
    },
    {
      id: 2,
      firstName: 'Bern',
      lastName: 'Venters',
      phoneNumber: '191-233-5184',
    },
    {
      id: 3,
      firstName: 'Jane',
      lastName: 'Withersteen',
      phoneNumber: '185-718-3018',
    },
  ];

  get salesPersons(): SalesPerson[] {
    return this.salesPersonArray.slice();
  }

  getSalesPerson(id: number): SalesPerson {
    return this.salesPersons.find((s) => s.id === +id);
  }

  getSalesPersonName(id: number) {
    const salesPerson = this.salesPersons.find(s => s.id === +id);

    return `${salesPerson.firstName} ${salesPerson.lastName}`;
  }

  addSalesPerson(salesPersonInfo: {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  }): number {
    const newSalesPerson = { ...salesPersonInfo, id: this.nextId() };

    this.salesPersonArray.push(newSalesPerson);

    return newSalesPerson.id;
  }

  nextId(): number {
    return Math.max(...this.salesPersonArray.map((s) => s.id)) + 1;
  }
}
