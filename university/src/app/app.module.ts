import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
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


import { RootComponent } from './components/root/root.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/students/students.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PositionsComponent } from './components/positions/positions.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { ProgressService } from './services/progress/progress.service';
import { StudentService } from './services/student/student.service';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';

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
    path: 'students',
    component: StudentsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'positions',
    component: PositionsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
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
    RootComponent,
    TopMenuComponent,
    DashboardComponent,
    StudentsComponent,
    LoginComponent,
    PageNotFoundComponent,
    PositionsComponent,
    ApplicationsComponent,
    ProgressbarComponent,
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
    MatChipsModule,
    MatListModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {
      provide: BREAKPOINTS,
      useValue: PRINT_BREAKPOINTS
    },
    AuthService,
    AuthGuardService,
    ProgressService,
    StudentService,
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
