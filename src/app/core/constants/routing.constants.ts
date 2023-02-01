import {Injectable, Input} from "@angular/core";
import {URL} from "../interfaces/url";

@Injectable()
export class RoutingConstants {

  @Input()
  public isDashboard: boolean | undefined;
  public readonly APP_URLS: {[key: string]: URL} = {
    DASHBOARD: {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'dashboard',
      sortOrder: 0
    },
    ROSTERS: {
      title: 'Rosters',
      path: '/rosters',
      icon: 'calendar_month',
      sortOrder: 1
    },
    APPLIANCE: {
      title: 'Appliance',
      path: '/appliance',
      icon: 'fire_truck',
      sortOrder: 2
    }
  }
}
