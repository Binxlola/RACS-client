import {createReducer, on} from "@ngrx/store";
import {IntervalPeriodsEnum} from "../interval-periods.enum";
import {StatusEnum} from "../../../core/enums/status.enum";
import {RosterActions, RosterApiActions} from "./roster.actions";
import {RosterState} from "../interfaces/roster-state";

export const initialState: RosterState = {
  allLoadedRosterDays: [],
  currentRosterDays: [],
  intervalPeriod: IntervalPeriodsEnum.Month,
  error: null,
  status: StatusEnum.Pending,
}

export const rosterReducer = createReducer(
  initialState,
  on(RosterApiActions.loadRosterDays, (state) => ({
    ...state,
    status: StatusEnum.Loading
  })),
  on(RosterApiActions.loadRosterDaysSuccess, (state, { rosterDays }) => ({
    ...state,
    allLoadedRosterDays: [...state.allLoadedRosterDays, ...rosterDays],
    currentRosterDays: rosterDays,
    error: null,
    status: StatusEnum.Success
  })),
  on(RosterApiActions.loadRosterDaysFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.Error
  })),
  on(RosterActions.updatePeriodInterval, (state, { newInterval }) => ({
    ...state,
    intervalPeriod: newInterval,
    status: StatusEnum.Pending
  })),
  on(RosterActions.navigateForward, (state) => ({
    ...state,
    status: StatusEnum.Loading
  })),
  on(RosterActions.navigateBackward, (state) => ({
    ...state,
    status: StatusEnum.Loading
  })),
)
