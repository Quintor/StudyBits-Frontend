export class ClaimRecord {
  id: number;
  schemaKey: string;
  revReqSeqNo: number;
  values: string;
  signature: string;
  signatureCorrectnessProof: string;
  issuerDid: string;
  myDid: string;

  constructor( id: number, values: string, issuerDid: string, myDid: string ) {
    this.id = id;
    this.values = values;
    this.issuerDid = issuerDid;
    this.myDid = myDid;
  }
}
