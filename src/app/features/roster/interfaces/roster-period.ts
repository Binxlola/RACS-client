import {RosterDay} from "./roster-day";

export interface RosterPeriod {
  periodStart: Date;
  periodEnd: Date;
  rosterDays: RosterDay[];
}
