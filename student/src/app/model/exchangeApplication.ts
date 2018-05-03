import { ExchangePosition } from './exchangePosition';
import { ApplicationState } from '../enums/ApplicationState';
import { TranscriptProof } from './transcriptProof';

export class ExchangeApplication {
  universityName: string;
  userName: string;
  exchangePositionModel: ExchangePosition;
  state: ApplicationState;
  proof: TranscriptProof;
}
