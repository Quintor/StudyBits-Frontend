import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Position } from '../../model/position';
import { HttpClient } from '@angular/common/http';
import { ProgressService } from '../progress/progress.service';
import { AuthService } from '../auth/auth.service';

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
    console.debug("Fetching positions from: " + this.getBaseUri());

    this.progress.inProgress(true);
    this.httpClient.get<Position[]>(this.getBaseUri())
      .subscribe((connections) => {
        console.debug("Received positions: " + JSON.stringify(connections));
        this.positions = [];
        this.positions.push.apply(this.positions, connections);
        this.observablePositions.next(this.positions);
        this.progress.inProgress(false);
      });
  }

}
