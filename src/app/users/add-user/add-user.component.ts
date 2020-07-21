import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService
    ) {}

  ngOnInit(): void {
    const ids = this.userService.users.map((a) => a.id);

    this.addUserForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          new RegExp(
            '[(][0-9]{3}[)][0-9]{3}[-][0-9]{4}|[0-9]{3}[-][0-9]{3}[-][0-9]{4}|[0-9]{10}'
          )
        ),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    const formValue = this.addUserForm.value;
    const newUser = {...formValue, id: 0, status: ''};

    this.userService.addUser(newUser);
    this.router.navigate(['list'], {relativeTo: this.route.parent});
  }

  log() {
    const obj = this.addUserForm.get('phone');
  }

  clearErrors(input: string) {
    const value = this.addUserForm.get(input).value;
    this.addUserForm.get(input).reset(value);
  }

  cancelAdd() {
    this.router.navigate(['list'], {relativeTo: this.route.parent});
  }
}
