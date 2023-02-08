import {createReducer, on} from "@ngrx/store";
import {IntervalPeriodsEnum} from "../interval-periods.enum";
import {StatusEnum} from "../../../core/enums/status.enum";
import {RosterActions, RosterApiActions} from "./roster.actions";
import {RosterState} from "../interfaces/roster-state";

const today = new Date();

export const initialState: RosterState = {
  currentStartDate: new Date(today.getFullYear(), today.getMonth(), 1),
  currentEndDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
  allRosterPeriods: [],
  currentRosterPeriod: null,
  intervalPeriod: IntervalPeriodsEnum.Month,
  error: null,
  status: StatusEnum.Pending,
}

export const rosterReducer = createReducer(
  initialState,
  on(RosterApiActions.loadRosterPeriod, (state) => ({
    ...state,
    status: StatusEnum.Loading
  })),
  on(RosterApiActions.loadRosterPeriodSuccess, (state, { rosterPeriod }) => ({
    ...state,
    allRosterPeriods: [...state.allRosterPeriods, rosterPeriod],
    error: null,
    status: StatusEnum.Success
  })),
  on(RosterApiActions.loadRosterPeriodFailure, (state, { error }) => ({
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
  on(RosterActions.navigateError, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.Error
  }))
)
