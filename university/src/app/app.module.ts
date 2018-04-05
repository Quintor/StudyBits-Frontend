import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule,
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

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
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
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'students',
    component: StudentsComponent
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
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    FlexLayoutModule,
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
