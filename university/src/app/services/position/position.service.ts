import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UniversityService } from '../university/university.service';
import { ProgressService } from '../progress/progress.service';
import { Observable } from 'rxjs/Observable';
import { ExchangePosition } from '../../model/exchangePosition';

@Injectable()
export class PositionService {

  private positions: Array<ExchangePosition> = [];
  observablePositions: BehaviorSubject<Array<ExchangePosition>>;

  constructor(public universityService: UniversityService, private progress: ProgressService, private httpClient: HttpClient, private authService: AuthService) {
    this.observablePositions = new BehaviorSubject<ExchangePosition[]>(this.positions);
    this.universityService.fetchSchemaDefinitions();
  }

  private getBaseUri(): string {
    return AppSettings.API_UNIVERSITY_ENDPOINT + `${this.authService.currentUser.universityName}/admin/${this.authService.currentUser.userName}/positions`;
  }

  fetchAll() {
    this.progress.inProgress(true);
    console.log('Fetching positions from: ' + this.getBaseUri());

    return this.httpClient.get<Array<ExchangePosition>>(this.getBaseUri())
      .subscribe(positions => {
          console.debug('Received positions: ' + JSON.stringify(positions));

          this.positions = [];
          this.positions.push.apply(this.positions, positions);
          this.observablePositions.next(this.positions);
        }, error => console.error('Could not fetchAll proof requests: ' + JSON.stringify(error)),
        () => this.progress.inProgress(false));
  }

  create(position: ExchangePosition): Observable<boolean> {
    this.progress.inProgress(true);
    console.log('Creating position: ' + JSON.stringify(position));

    return this.httpClient.post(this.getBaseUri(), position, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    }).map(res => {
      const msg = res.status == 200 ? 'Successfully created position ' : 'Error while creating position: ';
      console.log(msg + JSON.stringify(res));
      this.progress.inProgress(false);

      return res.status == 200;
    });
  }

}
