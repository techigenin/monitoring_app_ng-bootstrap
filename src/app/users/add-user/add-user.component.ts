import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { RegexService } from 'src/app/shared/regex.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [RegexService]
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private regexService: RegexService
  ) {}

  ngOnInit(): void {
    const ids = this.userService.users.map((a) => a.id);

    this.addUserForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regexService.phoneNumberRegex),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    const newUser = new User(
      0,
      this.addUserForm.get('firstName').value,
      this.addUserForm.get('lastName').value,
      this.addUserForm.get('phoneNumber').value,
      this.addUserForm.get('email').value,
      ''
    );

    this.userService.addUser(newUser);
    this.router.navigate(['list'], { relativeTo: this.route.parent });
  }

  clearErrors(input: string) {
    const value = this.addUserForm.get(input).value;
    this.addUserForm.get(input).reset(value);
  }

  cancelAdd() {
    this.router.navigate(['list'], { relativeTo: this.route.parent });
  }
}
