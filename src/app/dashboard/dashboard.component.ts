import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {RosterComponent} from "../features/roster/roster.component";
import {Observable} from "rxjs";
export interface DashBoardCard {
  title?: string,
  cols: number,
  rows: number,
  component: typeof RosterComponent | undefined
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  /** Based on the screen size, switch from standard to one column per row */
  private _cards$: Observable<DashBoardCard[]> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
    map( ({ matches }) => [
      { cols: matches ? 1:2, rows: 1, component: RosterComponent },
      { title: 'Card 2', cols: 1, rows: 1, component: undefined },
      { title: 'Card 3', cols: 1, rows: matches ? 1:2, component: undefined },
      { title: 'Card 4', cols: 1, rows: 1, component: undefined }
    ])
  );
  constructor(private _breakpointObserver: BreakpointObserver) {}

  get cards() {
    return this._cards$;
  }
}
