import { Injectable } from '@angular/core';
import { ClaimRecord } from '../../model/claimRecord';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../../app.settings';

@Injectable()
export class ClaimsService {

  constructor(private httpClient: HttpClient) { }

  getAllClaims(studentUsername: string): Observable<ClaimRecord[]> {
    return this.httpClient.get<ClaimRecord[]>(AppSettings.API_ENDPOINT + `student/${studentUsername}/claims`);
  }

  refreshClaims(studentUsername: string): Observable<boolean> {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `student/${studentUsername}/claims/new`, {observe: 'response'})
      .map(result => {
        console.log('Getting claims complete');
        console.log(result);
        return result.status == 200;
      });
  }
}
