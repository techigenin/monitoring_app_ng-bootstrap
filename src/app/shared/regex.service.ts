export class RegexService {
  private timestamp = '^(?:(?:([0-9]{0,2}):)?([0-5]?[0-9]):)?([0-5]?[0-9])$';

  get timeStampRegex(): RegExp {
    return new RegExp(this.timestamp);
  }
}
