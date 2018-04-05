import { Injectable } from '@angular/core';
import { ClaimRecord } from '../../model/claimRecord';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Student } from '../../model/student';
import { AppSettings } from '../../app.settings';
import { ConnectionRecord } from '../../model/connectionRecord';

@Injectable()
export class ClaimsService {

  constructor(private httpClient : HttpClient) { }

  getAllClaims() {
    // TODO: Add call to backend
    return [
      new ClaimRecord(Math.floor(Math.random() * 1000), JSON.parse(JSON.stringify({ name: 'Peter', certificate: 'Master'})), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2)),
      new ClaimRecord(Math.floor(Math.random() * 1000), JSON.parse(JSON.stringify({ name: 'Bob', certificate: 'Bachelor'})), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2)),
      new ClaimRecord(Math.floor(Math.random() * 1000), JSON.parse(JSON.stringify({ name: 'Clara', certificate: 'PhD'})), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2))
    ];
  }

  refreshClaims(studentUsername: string): Observable<boolean> {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `student/${studentUsername}/claims/new`, {observe: 'response'})
      .map(result => {
        console.log('Onboarding complete');
        console.log(result);
        return result.status == 200;
      });
  }
}
