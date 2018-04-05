import { Injectable } from '@angular/core';
import { ClaimRecord } from '../../model/claimRecord';

@Injectable()
export class ClaimsService {

  constructor() { }

  getAllClaims() {
    // TODO: Add call to backend
    return [
      new ClaimRecord(Math.floor(Math.random() * 1000), JSON.parse(JSON.stringify({ name: 'Peter', certificate: 'Master'})), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2)),
      new ClaimRecord(Math.floor(Math.random() * 1000), JSON.parse(JSON.stringify({ name: 'Bob', certificate: 'Bachelor'})), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2)),
      new ClaimRecord(Math.floor(Math.random() * 1000), JSON.parse(JSON.stringify({ name: 'Clara', certificate: 'PhD'})), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2))
    ];
  }
}
