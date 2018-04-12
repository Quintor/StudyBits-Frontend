import {University} from './university';
import {Student} from './student';

export class ConnectionRecord {
  id: number;
  did: string;
  university: University;
  student: Student;
  nonce: string;
  role: string;
  newcomerName: string;
  verkey: string;


  constructor( id: number, did: string, nonce: string, role: string, newcomerName: string, verkey: string ) {
    this.id = id;
    this.did = did;
    this.nonce = nonce;
    this.role = role;
    this.newcomerName = newcomerName;
    this.verkey = verkey;
  }
}
