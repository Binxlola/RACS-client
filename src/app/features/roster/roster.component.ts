import {Component, Input, OnInit} from '@angular/core';
import {DateConstants} from "../../core/constants/date.constants";
import {Store} from "@ngrx/store";
import {RosterActions, RosterApiActions} from "./state/roster.actions";
import {selectCurrentRosterDays} from "./state/roster.selectors";
import {Observable} from "rxjs";
import {RosterDay} from "./interfaces/roster-day";

export interface Roster {
  rosterMonth: number,
  rosterYear: number,
  rosterBlocks: RosterBlock[],
}
export interface RosterBlock {
  date: number,
  slots: string[]
}

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit{

  @Input()
  public isDashboard: boolean | undefined;
  public selectedRosterDays$: Observable<RosterDay[]> = this._store.select(selectCurrentRosterDays);

  public selectedMonth = 10;
  constructor(private _store: Store, public dateConstants: DateConstants) {}

  ngOnInit(): void {
    this._store.dispatch(RosterApiActions.loadRosterDays());

  }

  public navigateForward(): void {
    this._store.dispatch(RosterActions.navigateForward());
  }

  public navigateBackward(): void {
    this._store.dispatch(RosterActions.navigateBackward());
  }

}
