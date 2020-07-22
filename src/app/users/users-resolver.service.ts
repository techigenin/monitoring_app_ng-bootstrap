import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { User } from './user.model';
import { UsersService } from './users.service';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class UsersResolverService implements Resolve<User[]> {
  constructor(
    private userService: UsersService,
    private dataStorageService: DataStorageService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const users = this.userService.users;

    if (users.length === 0) {
      return this.dataStorageService.fetchUsers();
    } else {
      return users;
    }
  }
}
