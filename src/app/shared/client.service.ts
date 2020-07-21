import { Injectable } from '@angular/core';
import { Client } from './client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private clientArray: Client[] = [
    {
      id: 1,
      firstName: 'Zatanna',
      lastName: 'Zatara',
      phoneNumber: '111-222-3333',
    },
    {
      id: 2,
      firstName: 'Boston',
      lastName: 'Brand',
      phoneNumber: '222-333-4444',
    },
    { id: 3, firstName: 'Rac', lastName: 'Shade', phoneNumber: '999-888-7777' },
    {
      id: 4,
      firstName: 'June',
      lastName: 'Moone',
      phoneNumber: '555-555-5555',
    },
    {
      id: 5,
      firstName: 'Nimue',
      lastName: 'Inwudu',
      phoneNumber: '666-666-6666',
    },
  ];

  get clients(): Client[] {
    return this.clientArray.slice();
  }

  getClient(id: number): Client {
    return this.clients.find((c) => c.id === +id);
  }

  getClientName(id: number) {
    const client = this.clients.find(c => c.id === +id);

    return `${client.firstName} ${client.lastName}`;
  }

  addClient(clientInfo: {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  }): number {
    const newClient = { ...clientInfo, id: this.nextId() };

    this.clientArray.push(newClient);

    return newClient.id;
  }

  nextId(): number {
    return Math.max(...this.clientArray.map((s) => s.id)) + 1;
  }
}
