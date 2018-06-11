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
  demoData = {
    degree: "Bachelor of Arts, Marketing",
    status: "enroled",
    average: "7"
  };

  constructor(public dialogRef: MatDialogRef<CreatePositionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedSchema = data.schemas.find(schema => schema.name === "Transcript");
    for (let key in this.demoData) {
      this.setPositionAttribute(key, this.demoData[key])
    }
  }

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
      this.position.schemaId = this.selectedSchema.id;
      this.dialogRef.close(this.position);
    } else {
      this.dialogRef.close(null);
    }
  }
}
