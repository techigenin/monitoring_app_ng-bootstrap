import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { User } from './user.model';
import { UsersService } from './users.service';
import { DataStorageService } from '../shared/data-storage.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersResolverService implements Resolve<User[]> {
  constructor(
    private usersService: UsersService,
    private http: HttpClient,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usersService.fetchUsers();
  }
}
