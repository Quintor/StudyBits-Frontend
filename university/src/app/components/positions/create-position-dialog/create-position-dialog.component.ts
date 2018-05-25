import { Component, Inject } from '@angular/core';
import { ExchangePosition } from '../../../model/exchangePosition';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SchemaDefinitionModel } from '../../../model/schemaDefinition';

@Component({
  selector: 'app-create-position-dialog',
  templateUrl: './create-position-dialog.component.html',
  styleUrls: ['./create-position-dialog.component.css']
})
export class CreatePositionDialogComponent {

  selectedSchema = new SchemaDefinitionModel();
  position = new ExchangePosition();

  constructor(public dialogRef: MatDialogRef<CreatePositionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  setPositionAttribute(key, value) {
    if (value != "" && value != null) {
      this.position.attributes[key] = value;
    }
  }

  public getFilteredAttributes(schemaDefinition: SchemaDefinitionModel): Array<string> {
    if (schemaDefinition.name === "Enrolment"){
      return schemaDefinition.attrNames;
    } else if (schemaDefinition.name === "Transcript") {
      return ["degree", "status", "average"];
    } else {
      return null;
    }
  }

  closeDialog(create: boolean) {
    if (create) {
      this.position.universityName = this.data.universityName;
      this.position.schemaDefinitionModel = this.selectedSchema;
      this.dialogRef.close(this.position);
    } else {
      this.dialogRef.close(null);
    }
  }
}
