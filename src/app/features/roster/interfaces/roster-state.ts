import {RosterDay} from "./roster-day";
import {IntervalPeriodsEnum} from "../interval-periods.enum";
import {StatusEnum} from "../../../core/enums/status.enum";

export interface RosterState {
  allLoadedRosterDays: RosterDay[];
  currentRosterDays: RosterDay[];
  intervalPeriod: IntervalPeriodsEnum;
  error: string | null;
  status: StatusEnum;
}
