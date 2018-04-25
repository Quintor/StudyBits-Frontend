import { PositionState } from '../enums/PositionState';

export class Position {
  id: number;
  proofId: number;
  studentUserName: string;
  universityName: string;
  state: PositionState;
  link: string;
  name: string;
  version: string;
  isReviewed: boolean;
}
