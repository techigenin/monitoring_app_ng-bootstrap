import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  isAdmin: boolean;
  loggedInSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInSub = this.authService.loggedInChanged.subscribe(() => {
      this.isAuth = this.authService.isAuth;
      this.isAdmin = this.authService.isAdmin;
    });

    this.isAuth = this.authService.isAuth;
    this.isAdmin = this.authService.isAdmin;
  }

  ngOnDestroy() {
    if (this.loggedInSub) {
      this.loggedInSub.unsubscribe();
    }
  }

  onLoginClick() {
    this.authService.logIn();
  }

  onLogoutClick() {
    this.authService.logOut();
  }
}
