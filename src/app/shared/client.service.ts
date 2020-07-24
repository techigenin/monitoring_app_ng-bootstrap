import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { Client } from './client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private http: HttpClient) {}
  clientsChanged = new Subject<Client[]>();

  private clientArray: Client[] = [];

  fetchClients() {
    return this.http.get<Client[]>(environment.baseURL + 'clients').pipe(
      tap((clients) => {
        this.clientArray = clients;
      })
    );
  }

  get clients(): Client[] {
    return this.clientArray.slice();
  }

  getClient(id: number): Client {
    return this.clients.find((c) => c.id === +id);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(environment.baseURL + 'clients', client).pipe(
      tap((c) => {
        this.clientArray.push(client);
        this.clientsChanged.next(this.clients);
      })
    );
  }
}
