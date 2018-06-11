export class ProofRequest {
  id: number;
  proofId: number;
  studentUserName: string;
  universityName: string;
  link: string;
  name: string;
  version: string;
  attributes: Array<string>;
  isReviewed: boolean;
}
