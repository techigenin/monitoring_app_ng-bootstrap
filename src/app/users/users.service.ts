import { Injectable, OnInit } from '@angular/core';

import { User } from './user.model';
import { Subject } from 'rxjs';
import { UserStatus } from '../shared/user-status.constants';

@Injectable({ providedIn: 'root' })
export class UsersService{

  private userArray: User[] = [
    {
      id: 1,
      firstName: 'Bob',
      lastName: 'Robertson',
      phone: '(123)45617890',
      email: 'bob.robertson@thatmail.com',
      status: UserStatus.admin
    },
    {
      id: 2,
      firstName: 'Carla',
      lastName: 'Charleston',
      phone: '(098)765-4321',
      email: 'carla.charlston@thatmail.com',
      status: UserStatus.user
    },
    {
      id: 3,
      firstName: 'Danny',
      lastName: 'Davis',
      phone: '(567)123-5678',
      email: 'danny.davis@thatmail.com',
      status: UserStatus.guest
    },
  ];
  usersChanged = new Subject();

  getCurrentListner() {
    return this.userArray[0];
  }

  get users() {
    return this.userArray.slice();
  }

  getUser(id: number): User {
    return this.users.find(u => u.id === +id);
  }

  addUser(newUser: User) {
    this.userArray.push({
      ...newUser,
      id: this.nextId(),
    });
    this.usersChanged.next();
  }

  deleteUser(id: number) {
    this.userArray = this.userArray.filter(u => u.id !== id);
    this.usersChanged.next();
  }

  private nextId() {
    const ids = this.users.map((l) => l.id);

    return Math.max(...ids) + 1;
  }
}
