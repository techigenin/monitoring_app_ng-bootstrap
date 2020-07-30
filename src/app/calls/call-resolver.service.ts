import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CallsService } from './calls.service';
import { Call } from './call.model';

@Injectable({ providedIn: 'root' })
export class CallResolverService implements Resolve<Call[]> {
  constructor(private callsService: CallsService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Call[]> | Promise<Call[]> | Call[] {
    return this.callService.fetchCalls();
  }
}
