import { Injectable, OnInit } from '@angular/core';

import { User } from './user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private userArray: User[] = [];
  usersChanged = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getCurrentListner() {
    return this.userArray[0];
  }

  get users() {
    return this.userArray.slice();
  }

  getUser(id: number): User {
    return this.users.find((u) => u.id === +id);
  }

  setUsers(users: User[]) {
    this.userArray = users;
    this.usersChanged.next(this.userArray);
  }

  fetchUsers() {
    return this.http
      .get<User[]>('http://localhost:8080/log-server/api/users/')
      .pipe(
        tap((users) => {
          this.setUsers(users);
        })
      );
  }

  addUser(newUser: User) {
    this.http
    .post<User>(environment.baseURL + 'users/', newUser)
    .subscribe((user: User) => {
      this.userArray.push(user);
      this.usersChanged.next(this.userArray.slice());
    });
  }

  deleteUser(id: number) {
    this.http
      .delete(environment.baseURL + 'users/' + id)
      .subscribe(() => {
        this.userArray = this.userArray.filter((u) => u.id !== id);
        this.usersChanged.next(this.userArray);
      });
  }

  private nextId() {
    const ids = this.users.map((l) => l.id);

    return Math.max(...ids) + 1;
  }
}
