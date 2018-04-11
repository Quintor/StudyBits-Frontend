import { Injectable } from '@angular/core';
import { ClaimRecord } from '../../model/claimRecord';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClaimService {

  private claims: Array<ClaimRecord> = [];
  public observableClaims: BehaviorSubject<Array<ClaimRecord>>;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.observableClaims = new BehaviorSubject<Array<ClaimRecord>>(this.claims);
    this.fetchClaims();
  }

  getBaseUri(): string {
    return AppSettings.API_ENDPOINT + `student/${this.authService.currentUser.userName}/claims/`;
  }

  fetchClaims(): Observable<boolean> {
    console.debug(this.getBaseUri());
    return this.httpClient.get<ClaimRecord[]>(this.getBaseUri())
      .map((claims) => {
        console.log('Received claims: ' + JSON.stringify(claims));
        this.claims = [];
        this.claims.push.apply(this.claims, claims);
        this.observableClaims.next(this.claims);
        return true;
      }, error => {
        console.log('Could not fetch new claims: ' + error);
        return false;
      });
  }

  fetchNewClaims(): Observable<boolean> {
    console.debug(this.getBaseUri() + 'new');
    return this.httpClient.get(this.getBaseUri() + 'new').map((response: HttpResponse<boolean>) => {
      if (response == null) {
        console.error('Could not fetch new claims. ' + response);
        return false;
      }
      console.log('Successfully fetched new claims.');
      return true;
    });
  }
}
