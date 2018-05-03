import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Position } from '../../model/position';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProgressService } from '../progress/progress.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PositionService {

  private positions: Array<Position> = [];
  public observablePositions: BehaviorSubject<Array<Position>>;

  constructor(private httpClient: HttpClient, private authService: AuthService, private progress: ProgressService) {
    this.observablePositions = new BehaviorSubject<Position[]>(this.positions);
  }

  getBaseUri(): string {
    return AppSettings.API_ENDPOINT + `student/${this.authService.currentUser.userName}/positions`;
  }

  fetchAll() {
    console.debug('Fetching positions from: ' + this.getBaseUri());

    this.progress.inProgress(true);
    this.httpClient.get<Position[]>(this.getBaseUri())
      .subscribe((connections) => {
        console.debug('Received positions: ' + JSON.stringify(connections));
        this.positions = [];
        this.positions.push.apply(this.positions, connections);
        this.observablePositions.next(this.positions);
        this.progress.inProgress(false);
      });
  }

  fetchNew(): Observable<boolean> {
    this.progress.inProgress(true);
    return this.httpClient.get(this.getBaseUri() + '/new', {observe: 'response'})
      .map(res => {
        const msg = res.status == 200 ? 'Fetched new positions successfully: ' : 'Error while fetching new positions: ';
        console.log(msg + JSON.stringify(res));
        this.progress.inProgress(false);

        return res.status == 200;
      });
  }

  accept(position: Position): Observable<boolean> {
    this.progress.inProgress(true);
    console.log('Applying for position: ' + JSON.stringify(position));

    return this.httpClient.post(this.getBaseUri(), position, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    }).map(res => {
      const msg = res.status == 200 ? 'Successfully applied for position ' : 'Error while applying for position: ';
      console.log(msg + JSON.stringify(res));
      this.progress.inProgress(false);

      return res.status == 200;
    })
  }

}
