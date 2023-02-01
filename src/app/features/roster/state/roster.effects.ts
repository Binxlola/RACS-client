import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RosterService} from "../services/roster.service";
import {RosterActions, RosterApiActions} from "./roster.actions";
import {catchError, from, of, switchMap, tap} from "rxjs";
import {RosterDay} from "../interfaces/roster-day";
import {map} from "rxjs/operators";
import {AppState} from "../../../app.state";

@Injectable()
export class RosterEffects {
  constructor( private _actions$: Actions, private _store: Store<AppState>, private _rosterService: RosterService) {}

  public loadRosterDays$ = createEffect(() =>
    this._actions$.pipe(
      ofType(RosterApiActions.loadRosterDays),
      switchMap(() =>
        from(this._rosterService.getRosterDays()).pipe(
          map(
            (rosterDays: RosterDay[]) => RosterApiActions.loadRosterDaysSuccess({ rosterDays })
          ),
          catchError(
            (error: string) => of(RosterApiActions.loadRosterDaysFailure({ error }))
          )
        )
      )
    )
  )

  public navigateForward$ = createEffect(() =>
    this._actions$.pipe(
      ofType(RosterActions.navigateForward),
      tap(() => {
        // #TODO: here we check if we need to get more data or we can just update
      })
    )
  )

  public navigateBackward$ = createEffect(() =>
    this._actions$.pipe(
      ofType(RosterActions.navigateBackward),
      tap(() => {
        // #TODO: here we check if we need to get more data or we can just update
      })
    )
  )
}
