import {Injectable, Input} from "@angular/core";

@Injectable()
export class DateConstants {

  @Input()
  public isDashboard: boolean | undefined;
  private readonly _MONTHS: {[key: number]: string} = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  }

  private readonly _DAYS: {[key: number]: string} = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  }

  public getDayStrings(): string[] {
    return Object.values(this._DAYS)
  }

  public getMonth(month: number): string {
    return this._MONTHS[month];
  }

  public getDay(day: number): string {
    return this._DAYS[day];
  }
}
