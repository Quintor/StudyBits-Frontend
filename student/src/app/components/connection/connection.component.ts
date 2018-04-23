import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ConnectionRecord } from '../../model/connectionRecord';
import { ConnectionService } from '../../services/connection/connection.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { UniversityService } from '../../services/universities/university.service';
import { AuthService } from '../../services/auth/auth.service';
import { StudentService } from '../../services/student/student.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-connections',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({
        height: '0px',
        minHeight: '0',
        visibility: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        visibility: 'visible'
      })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ConnectionComponent implements OnInit {
  connectionSubscription: Subscription;

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'studentUserName', 'universityName', 'confirmed'];

  // For sorting of the table columns
  @ViewChild(MatSort) sort: MatSort;

  constructor(private connectionService: ConnectionService, private dialog: MatDialog, private snackBar: MatSnackBar, private universityService: UniversityService, private authService: AuthService, private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.connectionSubscription = this.connectionService.observableConnections.subscribe(
      (connections) => this.setDataSource(connections)
    );
    this.connectionService.fetchConnections();
    this.universityService.fetchUniversities();
  }

  private setDataSource(connections: Array<ConnectionRecord>) {
    this.dataSource = new MatTableDataSource<ConnectionRecord>(connections);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '250px',
      data: {universities: this.universityService.universities}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.studentService.connect(this.authService.currentUser, result).subscribe((result) => {
            const message = result ? 'Onboarding succeeded' : 'Onboarding failed';
            console.log(message);
            this.snackBar.open(message, null, {duration: 3000});
            this.connectionService.fetchConnections();
          }
        );
        console.log(result);
      }
    });
  }
}


