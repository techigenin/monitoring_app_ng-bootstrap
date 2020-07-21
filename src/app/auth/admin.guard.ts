import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isAdmin && this.authService.isAuth) {
      return true;
    } else {
      this.router.navigate([''], { relativeTo: this.route.root });
    }
  }
}
