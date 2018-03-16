import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from "@angular/router";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
} from "@angular/material";

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


const appRoutes: Routes = [
  {
    path: '',
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
  }
];


@NgModule({
  declarations: [
    TopMenuComponent,
    ClaimsComponent,
    ConnectionsComponent,
    ProfileComponent,
    SettingsComponent,
    DashboardComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [
    ClaimsService,
    ConnectionsService,
    ProfileService
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
