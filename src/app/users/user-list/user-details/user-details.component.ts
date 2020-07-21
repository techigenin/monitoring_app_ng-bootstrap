import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  wasClicked = false;
  @Input() user: User;
  @Input() itemNum: number;

  constructor(private userService: UsersService) {}

  ngOnInit() {}

  deleteUser() {
    const message = `Are you sure you want to delete ${this.user.firstName} ${this.user.lastName}?`;
    if (confirm(message)) {
      this.userService.deleteUser(this.user.id);
    }
  }
}
