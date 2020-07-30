import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../users.service';
import { User } from '../user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  showSubAreaArray: boolean[];
  showSubAreaArraySubject = new  Subject<number>();
  usersSub: Subscription;
  isAdmin: boolean;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usersSub = this.usersService.usersChanged.subscribe(users => {
      console.log(users);
      this.users = users;
    });
    this.showSubAreaArraySubject.subscribe(i => {
      this.showSubAreaArray.fill(false);
      this.showSubAreaArray[i] = true;
      console.log(this.showSubAreaArray);
    });

    this.isAdmin = this.authService.isAdmin;
    this.users = this.usersService.users;
    this.showSubAreaArray = new Array(this.users.length).fill(false);
  }

  ngOnDestroy() {
    this.usersSub?.unsubscribe();
  }

  deleteUser(id: number) {
    const user = this.usersService.users[id];
    const name = user.firstName + ' ' + user.lastName;

    if (confirm('Are you sure you want to delete ' + name + '?')) {
      this.usersService.deleteUser(id);
    }
  }

  addUser() {
    this.router.navigate(['add'], { relativeTo: this.route.parent });
  }

  showSubArea(i: number) {
    this.showSubAreaArraySubject.next(i);
  }
}
