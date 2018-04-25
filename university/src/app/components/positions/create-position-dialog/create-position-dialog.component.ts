import { Component, Inject } from '@angular/core';
import { Position } from '../../../model/position';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SchemaDefinition } from '../../../model/schemaDefinition';

@Component({
  selector: 'app-create-position-dialog',
  templateUrl: './create-position-dialog.component.html',
  styleUrls: ['./create-position-dialog.component.css']
})
export class CreatePositionDialogComponent {

  selectedSchema = new SchemaDefinition();
  position = new Position();

  constructor(public dialogRef: MatDialogRef<CreatePositionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  setPositionAttribute(key, value) {
    if (value != "" && value != null) {
      this.position.attributes[key] = value;
    }
  }

  closeDialog(create: boolean) {
    if (create) {
      this.position.universityName = this.data.universityName;
      this.position.schemaName = this.selectedSchema.name;
      this.position.schemaVersion = this.selectedSchema.version;
      this.dialogRef.close(this.position);
    } else {
      this.dialogRef.close(null);
    }
  }
}
