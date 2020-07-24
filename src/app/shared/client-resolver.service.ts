import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ClientService } from './client.service';
import { Client } from './client.model';

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<Client[]> {
  constructor(private clientService: ClientService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Client[]> | Promise<Client[]> | Client[] {
    return this.clientService.fetchClients();
  }
}
