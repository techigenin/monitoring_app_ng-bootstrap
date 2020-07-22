import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private usersService: UsersService,
    private http: HttpClient
  ) {}
}
