import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../model/student';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
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
export class StudentsComponent implements OnInit {

  studentSubscription: Subscription;

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['userName', 'firstName', 'lastName', 'ssn'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private studentService: StudentService, private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.studentSubscription = this.studentService.observableStudents.subscribe(
      (connections) => this.setDataSource(connections)
    );
    this.studentService.fetchAll();
  }

  private setDataSource(connections: Array<Student>) {
    this.dataSource = new MatTableDataSource<Student>(connections);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(student => {
      if (student != null) {
        this.studentService.createNew(student).subscribe(
          success => {
            this.snackBar.open('Student created successfully');
            this.studentService.fetchAll();
          },
          error => {
            this.snackBar.open('Error: Could not create Student');
            console.error('Could not create new Student: ' + JSON.stringify(error));
          }
        );
      }
    });
  }
}
