export class ClaimValue {
  key: string;
  value: string;
  nonce: number;

  constructor(key: string, value: string, nonce: number) {
    this.key = key;
    this.value = value;
    this.nonce = nonce;
  }
}
