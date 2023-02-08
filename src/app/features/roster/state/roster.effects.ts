import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RosterService} from "../services/roster.service";
import {RosterActions, RosterApiActions} from "./roster.actions";
import {catchError, from, Observable, of, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {AppState} from "../../../app.state";
import {selectCurrentEndDate, selectCurrentStartDate, selectIntervalPeriod} from "./roster.selectors";
import {IntervalPeriodsEnum} from "../interval-periods.enum";
import {RosterPeriod} from "../interfaces/roster-period";
import {Injectable} from "@angular/core";

@Injectable()
export class RosterEffects {
  constructor( private _actions$: Actions, private _store: Store<AppState>, private _rosterService: RosterService) {}

  private _selectedCurrentStartDate$: Observable<Date | undefined> = this._store.select(selectCurrentStartDate);
  private _selectedCurrentEndDate$: Observable<Date | undefined> = this._store.select(selectCurrentEndDate);
  private _selectedIntervalPeriod$: Observable<IntervalPeriodsEnum> = this._store.select(selectIntervalPeriod);



  public loadRosterDays$ = createEffect(() =>
    this._actions$.pipe(
      ofType(RosterApiActions.loadRosterPeriod),
      switchMap(() =>
        from(this._rosterService.loadRosterPeriod()).pipe(
          map(
            (rosterPeriod: RosterPeriod) => {
              RosterActions.updateCurrentlySelectedPeriod(
                {rosterPeriod, periodStart: rosterPeriod.periodStart, periodEnd: rosterPeriod.periodEnd}
              );
              return RosterApiActions.loadRosterPeriodSuccess({ rosterPeriod });
            }
          ),
          catchError(
            (error: string) => of(RosterApiActions.loadRosterPeriodFailure({ error }))
          )
        )
      )
    )
  )

}
