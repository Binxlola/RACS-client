import {Injectable} from "@angular/core";
import {RosterDay} from "../interfaces/roster-day";
import {
  combineLatest, defaultIfEmpty, EMPTY, iif, isEmpty, mergeAll,
  Observable,
  of,
  switchMap,
  take, takeLast, tap,
} from "rxjs";
import {Store} from "@ngrx/store";
import {
  selectCurrentEndDate,
  selectCurrentRosterPeriod,
  selectCurrentStartDate,
  selectIntervalPeriod, selectRosterPeriodFromDates
} from "../state/roster.selectors";
import {IntervalPeriodsEnum} from "../interval-periods.enum";
import {map} from "rxjs/operators";
import {RosterPeriod} from "../interfaces/roster-period";
import {RosterActions, RosterApiActions} from "../state/roster.actions";

@Injectable(
  { providedIn: 'root' }
)
export class RosterService {

  public month: number = 0;

  private _selectedCurrentStartDate$: Observable<Date | undefined> = this._store.select(selectCurrentStartDate);
  private _selectedCurrentEndDate$: Observable<Date | undefined> = this._store.select(selectCurrentEndDate);
  private _selectedIntervalPeriod$: Observable<IntervalPeriodsEnum> = this._store.select(selectIntervalPeriod);

  public dudPeriod: RosterPeriod = {
    periodStart: new Date(),
    periodEnd: new Date(),
    rosterDays: []
  }

  constructor(private _store: Store) {
  }

  private _getRosterDays(startDate: Date | undefined, endDate: Date | undefined): Observable<RosterPeriod> {

    return of(this.generateData(startDate!, endDate!));
  }

  private _calculateNewDate(intervalPeriod: IntervalPeriodsEnum, start: Date | undefined, end: Date | undefined): (Date|undefined)[] {
    let newStart = undefined;
    let newEnd = undefined;

    if(!start && !start) {
      let today: Date = new Date();
      newStart = new Date(today.getFullYear(), today.getMonth(),  1);
      newEnd = new Date(today.getFullYear(), today.getMonth() + 1,  0);
    } else if(intervalPeriod === IntervalPeriodsEnum.Month && end) {
      let newStart = new Date(end.getFullYear(), end.getMonth() + 2, 0);
      let newEnd = new Date(newStart.getFullYear(), newStart.getMonth(), 1);
    }

    return [newStart, newEnd]
  }

  public loadRosterPeriod(): Observable<RosterPeriod> {
    return combineLatest([this._selectedIntervalPeriod$, this._selectedCurrentStartDate$, this._selectedCurrentEndDate$])
      .pipe(
        take(1),
        switchMap(([intervalPeriod, startDate, endDate]) => {
          let [newStart, newEnd] = this._calculateNewDate(intervalPeriod, startDate, endDate);
          return this._getRosterDays(newStart, newEnd);
        }
      ));
  }

  /**
   * Dispatches two actions which will update the RosterState period dates
   * @param startDate The date of the currently selected period start
   * @param endDate The date of the currently selected period end
   * @private This is specific to the roster feature, and should be used in the service.
   */
  // private _updatePeriodDates(startDate: Date | undefined, endDate: Date | undefined): void {
  //   this._store.dispatch(RosterActions.updatePeriodStart({periodStart: startDate}));
  //   this._store.dispatch(RosterActions.updatePeriodEnd({periodEnd: endDate}));
  // }

  private generateData(periodStart: Date, periodEnd: Date): RosterPeriod {
    return {
      periodStart: periodStart,
      periodEnd: periodEnd,
      rosterDays: Array.from(Array(periodEnd.getDate()).keys()).map(day => {
        return {
          date: new Date(periodStart.getFullYear(), periodStart.getMonth(), day + 1),
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
}
