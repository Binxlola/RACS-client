import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RosterComponent} from "./features/roster/roster.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'rosters', component: RosterComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
