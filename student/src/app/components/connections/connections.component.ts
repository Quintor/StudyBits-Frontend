import {
  Component, Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatDialog, MatDialogRef,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { ConnectionRecord } from '../../model/connectionRecord';
import { ConnectionsService } from '../../services/connections/connections.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {CreateDialogComponent} from './create-dialog/create-dialog.component';
import {University} from '../../model/university';
import {UniversityService} from '../../services/universities/university.service';
import {AuthService} from '../../auth.service';
import {StudentService} from '../../services/students/student.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css'],
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

export class ConnectionsComponent implements OnInit {
  connections: ConnectionRecord[];
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'userName', 'universityName'];

  universities: University[];

  // For sorting of the table columns
  @ViewChild(MatSort) sort: MatSort;

  constructor( private connectionsService: ConnectionsService, private dialog: MatDialog, private snackBar: MatSnackBar, private universityService: UniversityService, private authService: AuthService, private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.refreshConnections();
    this.universityService.getUniversities().subscribe(universities => this.universities = universities);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '250px',
      data: {universities: this.universities}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.studentService.onboard(this.authService.currentUser, result).subscribe((result) => {
        const message = result ? 'Onboarding succeeded' : 'Onboarding failed';
        this.snackBar.open(message, null, {duration: 1000});
        this.refreshConnections();
      }
      );
      console.log(result);
    });
  }

  private refreshConnections(): void {
    this.connectionsService.getAllConnections(this.authService.currentUser.userName).subscribe(connections => {
      this.connections = connections;
      this.dataSource = new MatTableDataSource(this.connections);
    });

  }
}


