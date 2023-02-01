import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {RouterOutlet} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {RoutingConstants} from "./core/constants/routing.constants";
import { RosterComponent } from './features/roster/roster.component';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RosterCardComponent } from './roster-card/roster-card.component';
import {MatInputModule} from "@angular/material/input";
import {InjectComponent} from "./core/directives/inject-component.directive";
import {CommonModule} from "@angular/common";
import {DateConstants} from "./core/constants/date.constants";
import {EffectsModule} from '@ngrx/effects';
import {RosterEffects} from "./features/roster/state/roster.effects";
import {rosterReducer} from "./features/roster/state/roster.reducer";

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    DashboardComponent,
    RosterComponent,
    RosterCardComponent,
    InjectComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    AppRoutingModule,
    DragDropModule,
    MatInputModule,
    StoreModule.forRoot({
      roster: rosterReducer
    }),
    EffectsModule.forRoot([
      RosterEffects
    ])
  ],
  providers: [
    RoutingConstants,
    DateConstants,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
