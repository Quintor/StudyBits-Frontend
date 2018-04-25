import { Component } from '@angular/core';
import { Student } from '../../../model/student';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-student-dialog',
  templateUrl: './create-student-dialog.component.html',
  styleUrls: ['./create-student-dialog.component.css']
})
export class CreateStudentDialogComponent {

  student: Student = new Student();

  constructor(public dialogRef: MatDialogRef<CreateStudentDialogComponent>) { }

}
