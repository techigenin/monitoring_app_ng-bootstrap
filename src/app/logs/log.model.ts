import { Call } from '../calls/call.model';
import { User } from '../users/user.model';

export class Log {
  constructor(
    public id: number,
    public call: Call,
    public user: User,
    public date: Date
  ) {}
}
