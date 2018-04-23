import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Student } from '../../../model/student';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent {
  student: Student = new Student();

  constructor(public dialogRef: MatDialogRef<CreateDialogComponent>) { }

}
