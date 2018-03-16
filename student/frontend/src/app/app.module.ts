import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from "@angular/router";

import { TopMenuComponent } from './top-menu/top-menu.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClaimsComponent } from './claims/claims.component';
import { ConnectionsComponent } from './connections/connections.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {
MatButtonModule,
MatCheckboxModule,
MatIconModule,
MatMenuModule,
MatToolbarModule,
} from "@angular/material";
import { RootComponent } from './root/root.component';


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
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule {
}
