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
import { ConnectionsComponent } from './components/connections/connections.component';
import { StudentsComponent } from './components/students/students.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from '../../../student/src/app/services/auth-guard/auth-guard.service';

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
    path: 'students',
    component: StudentsComponent,
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
    ConnectionsComponent,
    StudentsComponent,
    ClaimsComponent,
    LoginComponent,
    PageNotFoundComponent
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
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
