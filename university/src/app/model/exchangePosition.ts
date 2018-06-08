import { SchemaDefinitionModel } from './schemaDefinition';
import { PositionState } from '../enums/PositionState';

export class ExchangePosition {
  universityName: string;
  schemaId: string;
  proofRecordId: number;
  state: PositionState;
  attributes: Map<string, string>;

  constructor() {
    this.state = PositionState.OPEN;
    this.attributes = new Map();
  }

}
