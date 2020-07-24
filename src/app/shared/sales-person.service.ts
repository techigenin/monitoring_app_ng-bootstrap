import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { SalesPerson } from './sales-person.model';

@Injectable({ providedIn: 'root' })
export class SalesPersonService {
  salesPersonsChanged = new Subject<SalesPerson[]>();

  constructor(private http: HttpClient) {}

  private salesPersonArray: SalesPerson[] = [];

  fetchSalesPersons() {
    return this.http
      .get<SalesPerson[]>(environment.baseURL + 'salesPersons')
      .pipe(
        tap((salesPersons) => {
          this.salesPersonArray = salesPersons;
        })
      );
  }

  get salesPersons(): SalesPerson[] {
    return this.salesPersonArray.slice();
  }

  getSalesPerson(id: number): SalesPerson {
    return this.salesPersons.find((s) => s.id === +id);
  }

  addSalesPerson(newSalesPerson: SalesPerson): Observable<SalesPerson> {
    return this.http
      .post<SalesPerson>(environment.baseURL + 'salesPersons', newSalesPerson)
      .pipe(
        tap((salesPerson: SalesPerson) => {
          this.salesPersonArray.push(salesPerson);
        })
      );
  }
}
