import { Injectable } from '@angular/core';
import { User } from '../users/user.model';
import { SalesPerson } from './sales-person.model';
import { Client } from './client.model';

@Injectable()
export class HelperMethodsService {
  constructor() { }

  static getFullName(person: User | SalesPerson | Client): string {
    return person.firstName + ' ' + person.lastName;
  }
}
