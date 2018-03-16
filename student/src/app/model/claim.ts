export class Claim {
  id: number;
  schemaKey: string;
  revReqSeqNo: number;
  values: string;
  signature: string;
  signatureCorrectnessProof: string;
  issuerDid: string;
  myDid: string;
  theirDid: string;

  constructor() {}
}
