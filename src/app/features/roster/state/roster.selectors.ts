import {createFeatureSelector, createSelector} from "@ngrx/store";
import {RosterState} from "../interfaces/roster-state";
import {RosterPeriod} from "../interfaces/roster-period";
import {RosterDay} from "../interfaces/roster-day";

export const selectRoster = createFeatureSelector<RosterState>('roster');

export const selectCurrentRosterPeriod = createSelector(
  selectRoster,
  (roster: RosterState) => roster.currentRosterPeriod
)

export const selectRosterPeriodFromDates = (start: Date, end: Date) => createSelector(
  selectRoster,
  (roster: RosterState) => {
    const period: RosterPeriod = {
      periodStart: start,
      periodEnd: end,
      rosterDays: []
    }

    // Find loaded roster periods that may potentially have the roster days that fall within the required period.
    // Search the roster day array of the found periods for roster days that fall within the required period
    // Add all matching roster days found to the roster days array for the roster period that is being returned
    roster.allRosterPeriods.filter(
      (rosterPeriod: RosterPeriod) =>
        (rosterPeriod.periodStart >= start || rosterPeriod.periodStart <= end) ||
        (rosterPeriod.periodEnd >= start || rosterPeriod.periodEnd <= end)
    ).forEach((foundPeriod: RosterPeriod) => {
      let matchingDays = foundPeriod.rosterDays.find(
        (rosterDay: RosterDay) => rosterDay.date >= start && rosterDay.date <= end
      )

      if(matchingDays !== undefined) period.rosterDays.push(matchingDays);
    })

    return period;
  }
)

export const selectIntervalPeriod = createSelector(
  selectRoster,
  (roster: RosterState) => roster.intervalPeriod
)

export const selectCurrentStartDate = createSelector(
  selectRoster,
  (roster: RosterState) => roster.currentStartDate
)

export const selectCurrentEndDate = createSelector(
  selectRoster,
  (roster: RosterState) => roster.currentEndDate
)
