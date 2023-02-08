import {IntervalPeriodsEnum} from "../interval-periods.enum";
import {StatusEnum} from "../../../core/enums/status.enum";
import {RosterDay} from "./roster-day";
import {RosterPeriod} from "./roster-period";

export interface RosterState {
  currentStartDate: Date,
  currentEndDate: Date,
  allRosterPeriods: RosterPeriod[];
  currentRosterPeriod: RosterPeriod | null;
  intervalPeriod: IntervalPeriodsEnum;
  error: string | null;
  status: StatusEnum;
}
