import {createFeatureSelector, createSelector} from "@ngrx/store";
import {RosterState} from "../interfaces/roster-state";

export const selectRoster = createFeatureSelector<RosterState>('roster');

export const selectCurrentRosterDays = createSelector(
  selectRoster,
  (roster: RosterState) => roster.currentRosterDays
)
