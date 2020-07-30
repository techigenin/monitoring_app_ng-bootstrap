import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user.model';
import { UsersService } from '../../users.service';
import { HelperMethodsService } from 'src/app/shared/helper-methods.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User;
  @Input() itemNum: number;
  userName: string;
  isAdmin: boolean;
  wasClicked = false;

  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userName = HelperMethodsService.getFullName(this.user);
    this.isAdmin = this.authService.isAdmin;
  }

  deleteUser() {
    const message = `Are you sure you want to delete ${this.user.firstName} ${this.user.lastName}?`;
    if (confirm(message)) {
      this.userService.deleteUser(this.user.id);
    }
  }
}
