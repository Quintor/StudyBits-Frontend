import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProofRequest } from '../../model/proofRequest';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AppSettings } from '../../app.settings';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProofRequestService {

  private proofRequests: Array<ProofRequest> = [];
  public observableRequests: BehaviorSubject<Array<ProofRequest>>;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.observableRequests = new BehaviorSubject<Array<ProofRequest>>(this.proofRequests);
    this.fetchProofRequests();
  }

  getBaseUri(): string {
    return AppSettings.API_ENDPOINT + `student/${this.authService.currentUser.userName}/proof-requests/`;
  }

  fetchProofRequests(): Observable<boolean> {
    console.debug(this.getBaseUri());
    return this.httpClient.get<ProofRequest[]>(this.getBaseUri())
      .map((proofRequests) => {
        console.debug('Received proof requests: ' + JSON.stringify(proofRequests));
        this.proofRequests = [];
        this.proofRequests.push.apply(this.proofRequests, proofRequests);
        this.observableRequests.next(this.proofRequests);
        return true;
      }, error => {
        console.error('Could not fetch proof requests: ' + error);
        return false;
      });
  }

  fetchNewProofRequests(): Observable<boolean> {
    console.debug(this.getBaseUri() + 'new');
    return this.httpClient.get(this.getBaseUri() + 'new').map((response: HttpResponse<boolean>) => {
      if (response == null) {
        console.error('Could not fetch new proof requests. ' + response);
        return false;
      }
      console.debug('Successfully fetched new proof requests.');
      return true;
    });
  }

  accept(proofRequest: ProofRequest): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    };
    return this.httpClient.post(this.getBaseUri(), JSON.stringify(proofRequest), httpOptions).map((response: HttpResponse<boolean>) => {
      if (response == null) {
        console.error('Could not accept proof request. ' + response);
        return false;
      }
      console.debug('Successfully accepted proof request.');
      return true;
      }
    )
  }
}
