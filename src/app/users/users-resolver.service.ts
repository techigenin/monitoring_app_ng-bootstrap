import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { User } from './user.model';
import { UsersService } from './users.service';

@Injectable({ providedIn: 'root' })
export class UsersResolverService implements Resolve<User[]> {
  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usersService.fetchUsers();
  }
}
