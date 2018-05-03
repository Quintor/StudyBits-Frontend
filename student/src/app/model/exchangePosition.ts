import { PositionState } from '../enums/PositionState';

export class ExchangePosition {
  universityName: string;
  isOpen: boolean;
  state: PositionState;
  schemaName: string;
  schemaVersion: string;
  attributes: Map<string, string>;

  constructor() {
    this.isOpen = true;
    this.attributes = new Map();
  }
}
