import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = true;
  private isAdminUser = true;

  loggedInChanged = new Subject<void>();

  constructor(private router: Router) {}

  logIn() {
    this.isLoggedIn = true;
    this.isAdminUser = true;

    this.loggedInChanged.next();
  }

  logOut() {
    this.isLoggedIn = false;
    this.isAdminUser = false;
    this.loggedInChanged.next();
    this.router.navigate(['']);
  }

  get isAuth(): boolean {
    return this.isLoggedIn;
  }

  get isAdmin(): boolean {
    return this.isAdminUser;
  }
}
