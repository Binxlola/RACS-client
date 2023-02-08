import {Component, Input, OnInit} from '@angular/core';
import {DateConstants} from "../../core/constants/date.constants";
import {Store} from "@ngrx/store";
import {RosterActions, RosterApiActions} from "./state/roster.actions";
import {
  selectCurrentRosterPeriod,
} from "./state/roster.selectors";
import {Observable, of, share, switchMap} from "rxjs";
import {RosterPeriod} from "./interfaces/roster-period";

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit{

  @Input()
  public isDashboard: boolean | undefined;

  public selectCurrentRosterPeriod$: Observable<RosterPeriod | null>;
  public currentPeriodHeader$: Observable<string | null>;


  constructor(private _store: Store, public dateConstants: DateConstants) {
    this.selectCurrentRosterPeriod$ = this._store.select(selectCurrentRosterPeriod);
    this.currentPeriodHeader$ = this.selectCurrentRosterPeriod$.pipe(
      switchMap((rosterPeriod: RosterPeriod | null) => this._getPeriodString(rosterPeriod))
    );
  }

  ngOnInit(): void {
    this._store.dispatch(RosterApiActions.loadRosterPeriod());
  }

  public navigateForward(): void {
    this._store.dispatch(RosterActions.navigateForward());
  }

  public navigateBackward(): void {
    this._store.dispatch(RosterActions.navigateBackward());
  }

  /**
   * Take a roster period and based on the set start and end dates.
   * Generates a header for the calendar and returns it as an Observable<string>
   * @param rosterPeriod The roster period that is being used to generate a header
   * @private
   */
  private _getPeriodString(rosterPeriod: RosterPeriod | null): Observable<string> {

    // A roster period exists, so we are able to generate a representative header
    if(rosterPeriod) {
      const periodStart = rosterPeriod.periodStart, periodEnd = rosterPeriod.periodEnd;
      const startDay = periodStart.getDate(), endDay = periodEnd.getDate();
      const startMonth = periodStart.getMonth(), endMonth = periodEnd.getMonth();
      const startYear = periodStart.getFullYear(), endYear = periodEnd.getFullYear();

      // The periods fall in the same month of the same year.
      // We need to check if the period is the entire month
      if((startMonth === endMonth) && (startYear === endYear)) {
        let daysForMonth = new Date(periodStart.getFullYear(), periodStart.getMonth() + 1, 0).getDate();
        let month = periodStart.getMonth();
        if(startDay === 1 && endDay === daysForMonth) return of(this.dateConstants.getMonth(month))
      }
    }

    return of('header');
  }

}
