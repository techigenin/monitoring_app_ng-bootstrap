import { RequiredValidator } from '@angular/forms';

export class TimestampService {
  stringToTimestampDate(input: string): Date {
    const splitInput: number[] = input.split(':').map((i) => +i);

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    switch (splitInput.length) {
      case 3:
        hours = splitInput[0];
        minutes = splitInput[1];
        seconds = splitInput[2];
        break;
      case 2:
        minutes = splitInput[0];
        seconds = splitInput[1];
        break;
      case 1:
        seconds = splitInput[0];
        break;
    }

    const retVal: Date = new Date(0);
    retVal.setUTCHours(hours, minutes, seconds);

    return retVal;
  }

  compareTimestampStrings(a: string, b: string) {
    const aStamp = this.stringToTimestampDate(a);
    const bStamp = this.stringToTimestampDate(b);

    return aStamp > bStamp ? 1 : -1;
  }

  formatTimestamps(timestamp: string) {
    timestamp = timestamp.trim();

    const splitTimestamp = timestamp.split(':');

    for (const [i, el] of splitTimestamp.entries()) {
      if (el.length < 2) {
        splitTimestamp[i] = '0' + el;
      }
    }

    if (splitTimestamp.length === 3) {
      return `${splitTimestamp[0]}:${splitTimestamp[1]}:${splitTimestamp[2]}`;
    } else if (splitTimestamp.length === 2) {
      return `00:${splitTimestamp[0]}:${splitTimestamp[1]}`;
    } else {
      return `00:00:${splitTimestamp[0]}`;
    }
  }
}
