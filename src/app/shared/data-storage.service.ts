import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private usersService: UsersService,
    private http: HttpClient
  ) {}

  fetchUsers() {
    this.http
      .get('http://localhost:8080/log-server/api/users/', {responseType: 'json'})
      .subscribe(user => {
        console.log(user);
      }, error => {
        console.log(error);
      });

    return this.http
      .get<User[]>('http://localhost:8080/log-server/api/users/')
      .pipe(
        tap( users => {
          this.usersService.setUsers(users);
        })
      );
  }
}
