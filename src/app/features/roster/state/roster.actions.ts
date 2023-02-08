import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {IntervalPeriodsEnum} from "../interval-periods.enum";
import {RosterPeriod} from "../interfaces/roster-period";

export const RosterActions = createActionGroup({
  source: 'Roster',
  events: {
    'Update Currently Selected Period': props<{rosterPeriod: RosterPeriod, periodStart: Date, periodEnd: Date}>(),
    'Update Period Interval': props<{ newInterval: IntervalPeriodsEnum }>(),
    'Navigate Forward': emptyProps(),
    'Navigate Backward': emptyProps(),
    'Navigate Error': props<{ error: string }>()
  }
})

export const RosterApiActions = createActionGroup({
  source: 'Roster API',
  events: {
    'Load Roster Period': emptyProps(),
    'Load Roster Period Success': props<{ rosterPeriod: RosterPeriod }>(),
    'Load Roster Period Failure': props<{ error: string }>()
  }
})
