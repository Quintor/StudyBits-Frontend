import { SchemaDefinition } from './schemaDefinition';
import { PositionState } from '../enums/PositionState';

export class Position {
  universityName: string;
  schemaDefinition: SchemaDefinition;
  state: PositionState;
  attributes: Map<string, string>;

  constructor() {
    this.schemaDefinition = new SchemaDefinition();
    this.state = PositionState.OPEN;
    this.attributes = new Map();
  }

}
