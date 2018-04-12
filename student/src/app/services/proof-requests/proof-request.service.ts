import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProofRequest } from '../../model/proofRequest';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AppSettings } from '../../app.settings';
import { Observable } from 'rxjs/Observable';
import { ProgressService } from '../progress/progress.service';

@Injectable()
export class ProofRequestService {

  private proofRequests: Array<ProofRequest> = [];
  public observableRequests: BehaviorSubject<Array<ProofRequest>>;

  constructor(private httpClient: HttpClient, private authService: AuthService, private progress: ProgressService) {
    this.observableRequests = new BehaviorSubject<Array<ProofRequest>>(this.proofRequests);
    this.fetchProofRequests();
  }

  getBaseUri(): string {
    return AppSettings.API_ENDPOINT + `student/${this.authService.currentUser.userName}/proof-requests/`;
  }

  fetchProofRequests(): Observable<boolean> {
    console.debug(this.getBaseUri());

    this.progress.inProgress(true);
    return this.httpClient.get<ProofRequest[]>(this.getBaseUri())
      .map((proofRequests) => {
        console.debug('Received proof requests: ' + JSON.stringify(proofRequests));
        this.proofRequests = [];
        this.proofRequests.push.apply(this.proofRequests, proofRequests);
        this.observableRequests.next(this.proofRequests);
        this.progress.inProgress(false);

        return true;
      }, error => {
        console.error('Could not fetch proof requests: ' + JSON.stringify(error));
        this.progress.inProgress(false);
        return false;
      });
  }

  fetchNewProofRequests(): Observable<boolean> {
    console.debug(this.getBaseUri() + 'new');

    this.progress.inProgress(true);
    return this.httpClient.get(this.getBaseUri() + 'new', {observe: 'response'}).map((res: HttpResponse<boolean>) => {
      this.progress.inProgress(false);
      let msg = res.status == 200 ? 'Successfully fetched new claims.' : ('Could not fetch new claims. ' + JSON.stringify(res));
      console.debug(msg);

      return res.status == 200;
    });
  }

  accept(proofRequest: ProofRequest): Observable<boolean> {
    this.progress.inProgress(true);
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };

    return this.httpClient.post(this.getBaseUri(), JSON.stringify(proofRequest), httpOptions).map((res: HttpResponse<boolean>) => {
      this.progress.inProgress(false);
      let msg = res.status == 200 ? 'Successfully accepted proof request.' : ('Could not accept proof request. ' + res);
      console.log(msg);

      return res.status == 200;
      }
    )
  }
}
