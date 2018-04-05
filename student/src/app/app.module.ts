import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
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
  MatFormFieldModule, MatInput, MatInputModule, MatSelectModule,
  MatDialogModule,
  MatSnackBarModule,
} from '@angular/material';
import {
  BREAKPOINTS,
  FlexLayoutModule
} from '@angular/flex-layout';

import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClaimsComponent } from './components/claims/claims.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RootComponent } from './components/root/root.component';

import { ClaimsService } from './services/claims/claims.service';
import { ConnectionsService } from './services/connections/connections.service';
import { ProfileService } from './services/profile/profile.service';
import { DetailRowDirective } from './directives/detail-row/detail-row.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AuthGuardService} from './auth-guard.service';
import {AuthService} from './auth.service';
import { CreateDialogComponent } from './components/connections/create-dialog/create-dialog.component';
import {UniversityService} from './services/universities/university.service';
import {StudentService} from './services/students/student.service';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'claims',
    component: ClaimsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'connections',
    component: ConnectionsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
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
    PageNotFoundComponent,
    LoginComponent,
    CreateDialogComponent
  ],
  entryComponents: [
    CreateDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatDividerModule,
    FormsModule,
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
    AuthService,
    AuthGuardService,
    ClaimsService,
    ConnectionsService,
    ProfileService,
    StudentService,
    UniversityService
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
