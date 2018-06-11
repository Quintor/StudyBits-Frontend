import { Injectable } from '@angular/core';
import { ClaimRecord } from '../../model/claimRecord';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ProgressService } from '../progress/progress.service';

@Injectable()
export class ClaimService {

  private claims: Array<ClaimRecord> = [];
  public observableClaims: BehaviorSubject<Array<ClaimRecord>>;

  constructor(private httpClient: HttpClient, private authService: AuthService, private progress: ProgressService) {
    this.observableClaims = new BehaviorSubject<Array<ClaimRecord>>(this.claims);
    this.fetchClaims();
  }

  getBaseUri(): string {
    return AppSettings.API_STUDENT_ENDPOINT + `student/${this.authService.currentUser.userName}/claims/`;
  }

  fetchClaims(): Observable<boolean> {
    console.debug(this.getBaseUri());

    this.progress.inProgress(true);
    return this.httpClient.get<ClaimRecord[]>(this.getBaseUri())
      .map((claims) => {
        console.log('Received claims: ' + JSON.stringify(claims));
        this.claims = [];
        this.claims.push.apply(this.claims, claims);
        this.observableClaims.next(this.claims);
        this.progress.inProgress(false);

        return true;
      }, error => {
        console.log('Could not fetch new claims: ' + error);
        this.progress.inProgress(false);

        return false;
      });
  }

  fetchNewClaims(): Observable<boolean> {
    console.debug(this.getBaseUri() + 'new');

    this.progress.inProgress(true);
    return this.httpClient.get(this.getBaseUri() + 'new', {observe: 'response'}).map((res: HttpResponse<boolean>) => {
      this.progress.inProgress(false);
      let msg = res.status == 200 ? 'Successfully fetched new claims.' : ('Could not fetch new claims. ' + JSON.stringify(res));
      console.debug(msg);

      return res.status == 200;
    });
  }
}
