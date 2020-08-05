import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  isAdmin: boolean;
  loggedInSub: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
    this.router.navigate(['login'], { relativeTo: this.route.root });
  }

  onLogoutClick() {
    this.authService.logOut();
    this.router.navigate([''], { relativeTo: this.route.root });
  }
}
