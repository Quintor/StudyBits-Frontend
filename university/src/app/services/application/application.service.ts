import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ProgressService } from '../progress/progress.service';
import { ExchangeApplication } from '../../model/exchangeApplication';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApplicationService {

  private applications: Array<ExchangeApplication> = [];
  observableApplications: BehaviorSubject<Array<ExchangeApplication>>;

  constructor(private progress: ProgressService, private httpClient: HttpClient, private authService: AuthService) {
    this.observableApplications = new BehaviorSubject<ExchangeApplication[]>(this.applications);
  }

  private getBaseUri(): string {
    return AppSettings.API_UNIVERSITY_ENDPOINT + `${this.authService.currentUser.universityName}/admin/${this.authService.currentUser.userName}/applications`;
  }

  fetchAll() {
    this.progress.inProgress(true);
    console.log('Fetching applications from: ' + this.getBaseUri());

    return this.httpClient.get<Array<ExchangeApplication>>(this.getBaseUri())
      .subscribe(applications => {
          console.debug('Received applications: ' + JSON.stringify(applications));

          this.applications = [];
          this.applications.push.apply(this.applications, applications);
          this.observableApplications.next(this.applications);
        }, error => console.error('Could not fetch all applications: ' + JSON.stringify(error)),
        () => this.progress.inProgress(false));
  }

  accept(application: ExchangeApplication): Observable<boolean> {
    this.progress.inProgress(true);

    return this.httpClient.post<any>(this.getBaseUri(), JSON.stringify(application), {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    }).map((res: HttpResponse<boolean>) => {
        this.progress.inProgress(false);
        let msg = res.status == 200 ? 'Successfully accepted application.' : ('Could not accept application. ' + res);
        console.log(msg);

        return res.status == 200;
      }
    )
  }

}
