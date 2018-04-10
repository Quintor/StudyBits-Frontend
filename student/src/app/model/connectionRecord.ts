import {University} from './university';
import {Student} from './student';

export class ConnectionRecord {
  id: number;
  did: string;
  nonce: string;
  role: string;
  userName: string;
  universityName: string;

  constructor( id: number, did: string, nonce: string, role: string, userName: string, universityName: string ) {
    this.id = id;
    this.did = did;
    this.nonce = nonce;
    this.role = role;
    this.userName = userName;
    this.universityName = universityName;
  }
}
