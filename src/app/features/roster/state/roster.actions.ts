import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {IntervalPeriodsEnum} from "../interval-periods.enum";
import {RosterDay} from "../interfaces/roster-day";

export const RosterActions = createActionGroup({
  source: 'Roster',
  events: {
    'Update Period Interval': props<{ newInterval: IntervalPeriodsEnum }>(),
    'Navigate Forward': emptyProps(),
    'Navigate Backward': emptyProps(),
  }
})

export const RosterApiActions = createActionGroup({
  source: 'Roster API',
  events: {
    'Load Roster Days': emptyProps(),
    'Load Roster Days Success': props<{ rosterDays: RosterDay[] }>(),
    'Load Roster Days Failure': props<{ error: string }>()
  }
})
