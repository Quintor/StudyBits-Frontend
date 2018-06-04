import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgressService } from '../progress/progress.service';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppSettings } from '../../app.settings';
import { Observable } from 'rxjs/Observable';
import { ExchangeApplication } from '../../model/exchangeApplication';

@Injectable()
export class ApplicationService {

  private applications: Array<ExchangeApplication> = [];
  public observableApplications: BehaviorSubject<Array<ExchangeApplication>>;

  constructor(private httpClient: HttpClient, private authService: AuthService, private progress: ProgressService) {
    this.observableApplications = new BehaviorSubject<ExchangeApplication[]>(this.applications);
  }

  getBaseUri(): string {
    return AppSettings.API_ENDPOINT + `student/${this.authService.currentUser.userName}/applications`;
  }

  fetchAll() {
    console.debug('Fetching applications from: ' + this.getBaseUri());

    this.progress.inProgress(true);
    this.httpClient.get<ExchangeApplication[]>(this.getBaseUri())
      .subscribe((applications) => {
        console.debug('Received applications: ' + JSON.stringify(applications));

        this.applications = [];
        this.applications.push.apply(this.applications, applications);
        this.observableApplications.next(this.applications);
        this.progress.inProgress(false);
      });
  }

  fetchNew(): Observable<boolean> {
    this.progress.inProgress(true);
    return this.httpClient.get(this.getBaseUri() + '/new', {observe: 'response'})
      .map(res => {
        const msg = res.status == 200 ? 'Fetched new applications successfully: ' : 'Error while fetching new applications: ';
        console.log(msg + JSON.stringify(res));
        this.progress.inProgress(false);

        return res.status == 200;
      });
  }

}
