export class Claim {
  id: number;
  schemaKey: string;
  revReqSeqNo: number;
  values: JSON;
  signature: string;
  signatureCorrectnessProof: string;
  issuerDid: string;
  myDid: string;

  constructor(id: number, values: JSON, issuerDid: string, myDid: string) {
    this.id = id;
    this.values = values;
    this.issuerDid = issuerDid;
    this.myDid = myDid;
  }
}
