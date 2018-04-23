import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UniversityService } from '../university/university.service';
import { ProgressService } from '../progress/progress.service';

@Injectable()
export class PositionService {

  private positions: Array<Position> = [];
  observablePositions: BehaviorSubject<Array<Position>>;

  constructor(public universityService: UniversityService, private progress: ProgressService, private httpClient: HttpClient, private authService: AuthService) {
    this.observablePositions = new BehaviorSubject<Position[]>(this.positions);
    this.universityService.fetchSchemaDefinitions();
  }

  private getBaseUri(): string {
    return AppSettings.API_ENDPOINT + `/${this.authService.currentUser.universityName}/admin/${this.authService.currentUser.userName}/positions`;
  }

  fetch() {
    this.progress.inProgress(true);
    return this.httpClient.get<Array<Position>>(this.getBaseUri())
      .subscribe(positions => {
          console.debug('Received positions: ' + JSON.stringify(positions));
          this.positions = [];
          this.positions.push.apply(this.positions, positions);
          this.observablePositions.next(this.positions);
        }, error => console.error('Could not fetch proof requests: ' + JSON.stringify(error)),
        () => this.progress.inProgress(false));
  }
}
