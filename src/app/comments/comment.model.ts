import { ConcernLevel } from '../shared/concern-level.constants';
import { Log } from '../logs/log.model';

export class Comment {
  constructor(
    public id: number,
    public log: Log,
    public concernLvl: ConcernLevel,
    public reason: string,
    public statement: string,
    public comment: string,
    public time: string
  ) {}
}
