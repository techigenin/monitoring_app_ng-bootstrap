import { UserStatus } from '../shared/user-status.constants';

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public email: string,
    public status: string,
  ) {}
}
