import { TranscriptProof } from './transcriptProof';
import { ExchangePosition } from './exchangePosition';
import { ApplicationState } from '../enums/ApplicationState';

export class ExchangeApplication {
  universityName: string;
  userName: string;
  exchangePositionModel: ExchangePosition;
  state: ApplicationState;
  proof: TranscriptProof;
}
