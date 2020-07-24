import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { SalesPersonService } from './sales-person.service';
import { SalesPerson } from './sales-person.model';

@Injectable({ providedIn: 'root' })
export class SalesPersonResolver implements Resolve<SalesPerson[]> {
  constructor(private salesPersonService: SalesPersonService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<SalesPerson[]> | Promise<SalesPerson[]> | SalesPerson[] {
    return this.salesPersonService.fetchSalesPersons();
  }
}
