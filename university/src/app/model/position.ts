export class Position {
  universityName: string;
  isOpen: boolean;
  schemaName: string;
  schemaVersion: string;
  attributes: Map<string, string>;

  constructor() {
    this.isOpen = true;
    this.attributes = new Map();
  }
}
