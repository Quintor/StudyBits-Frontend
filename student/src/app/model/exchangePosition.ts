import { PositionState } from '../enums/PositionState';
import { SchemaDefinitionModel } from './schemaDefinition';

export class ExchangePosition {
  universityName: string;
  schemaDefinitionModel: SchemaDefinitionModel;
  proofRecordId: number;
  state: PositionState;
  attributes: Map<string, string>;

  constructor() {
    this.schemaDefinitionModel = new SchemaDefinitionModel();
    this.state = PositionState.OPEN;
    this.attributes = new Map();
  }
}
