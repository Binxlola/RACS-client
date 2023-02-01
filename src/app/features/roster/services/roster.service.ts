import {Injectable} from "@angular/core";
import {RosterDay} from "../interfaces/roster-day";
import {Observable, of} from "rxjs";

@Injectable(
  { providedIn: 'root' }
)
export class RosterService {

  // This is testing data
  public dates: number[] = Array.from(Array(30).keys());
  public month: number = 0;

  constructor() {}

  public getRosterDays(): Observable<RosterDay[]> {
    return of(this.generateData());
  }

  private generateData(): RosterDay[] {
    this.month++;

    return this.dates.map(day => {
      return {
        date: day,
        slots: [
          'Jason' + this.month,
          'Walter'+ this.month,
          'Ryan' + this.month,
          'Mike' + this.month
        ]
      }
    })
  }
}
