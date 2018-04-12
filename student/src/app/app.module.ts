import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import { BREAKPOINTS, FlexLayoutModule } from '@angular/flex-layout';

import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClaimComponent } from './components/claim/claim.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RootComponent } from './components/root/root.component';

import { ClaimService } from './services/claim/claim.service';
import { ConnectionService } from './services/connection/connection.service';
import { ProfileService } from './services/profile/profile.service';
import { DetailRowDirective } from './directives/detail-row/detail-row.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { CreateDialogComponent } from './components/connection/create-dialog/create-dialog.component';
import { UniversityService } from './services/universities/university.service';
import { StudentService } from './services/student/student.service';
import { ProofRequestService } from './services/proof-requests/proof-request.service';
import { ProofRequestComponent } from './components/proof-request/proof-request.component';
import { ProgressbarComponent } from './components/progress/progressbar/progressbar.component';
import { ProgressService } from './services/progress/progress.service';


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
    component: ClaimComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'proof-requests',
    component: ProofRequestComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'connections',
    component: ConnectionComponent,
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
    ClaimComponent,
    ConnectionComponent,
    ProfileComponent,
    SettingsComponent,
    DashboardComponent,
    RootComponent,
    DetailRowDirective,
    PageNotFoundComponent,
    LoginComponent,
    CreateDialogComponent,
    ProofRequestComponent,
    ProgressbarComponent,
  ],
  entryComponents: [
    CreateDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
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
    MatProgressBarModule,
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
    ClaimService,
    ConnectionService,
    ProfileService,
    StudentService,
    UniversityService,
    ProofRequestService,
    ProgressService,
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
