export class RegexService {
  private timestamp = '^(?:(?:([0-9]{0,2}):)?([0-5]?[0-9]):)?([0-5]?[0-9])$';
  private phoneNumber = '^[(][0-9]{3}[)][0-9]{3}[-][0-9]{4}|[0-9]{3}[-][0-9]{3}[-][0-9]{4}|[0-9]{10}$';

  get timeStampRegex(): RegExp {
    return new RegExp(this.timestamp);
  }

  get phoneNumberRegex(): RegExp {
    return new RegExp(this.phoneNumber);
  }
}
