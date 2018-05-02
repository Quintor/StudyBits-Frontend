import { SchemaDefinitionRecord } from './schemaDefinition';
import { PositionState } from '../enums/PositionState';

export class Position {
  universityName: string;
  schemaDefinitionRecord: SchemaDefinitionRecord;
  state: PositionState;
  attributes: Map<string, string>;

  constructor() {
    this.schemaDefinitionRecord = new SchemaDefinitionRecord();
    this.state = PositionState.OPEN;
    this.attributes = new Map();
  }

}
