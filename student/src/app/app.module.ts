import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from "@angular/router";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
} from "@angular/material";
import {
  BREAKPOINTS,
  FlexLayoutModule
} from '@angular/flex-layout';

import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClaimsComponent } from './components/claims/claims.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RootComponent } from './components/root/root.component';

import { ClaimsService } from "./services/claims/claims.service";
import { ConnectionsService } from "./services/connections/connections.service";
import { ProfileService } from "./services/profile/profile.service";
import { DetailRowDirective } from "./directives/detail-row/detail-row.directive";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'claims',
    component: ClaimsComponent
  },
  {
    path: 'connections',
    component: ConnectionsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

const PRINT_BREAKPOINTS = [{
  alias: 'xs.print',
  suffix: 'XsPrint',
  mediaQuery: 'print and (max-width: 297px)',
  overlapping: false
}];


@NgModule({
  declarations: [
    TopMenuComponent,
    ClaimsComponent,
    ConnectionsComponent,
    ProfileComponent,
    SettingsComponent,
    DashboardComponent,
    RootComponent,
    DetailRowDirective,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    FlexLayoutModule,
    MatDividerModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    )
  ],
  providers: [
    {
      provide: BREAKPOINTS,
      useValue: PRINT_BREAKPOINTS
    },
    ClaimsService,
    ConnectionsService,
    ProfileService
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
