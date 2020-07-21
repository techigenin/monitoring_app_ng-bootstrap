import {Component} from '@angular/core';
import { User } from '../user.model';

@Component ({
  selector: 'app-user-warning',
  templateUrl: './user-warning.component.html'
})
export class UserWarningComponent {
  user: User;
}
