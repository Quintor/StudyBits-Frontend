import { Injectable } from '@angular/core';
import { ConnectionRecord } from '../../model/connectionRecord';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ConnectionService {

  private connections: Array<ConnectionRecord> = [];
  public observableConnections: BehaviorSubject<Array<ConnectionRecord>>;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.observableConnections = new BehaviorSubject<ConnectionRecord[]>(this.connections);
  }

  getBaseUri(): string {
    return AppSettings.API_ENDPOINT + `student/${this.authService.currentUser.userName}/connections`;
  }

  fetchConnections() {
    console.debug("Fetching connections from: " + this.getBaseUri());
    this.httpClient.get<ConnectionRecord[]>(this.getBaseUri())
      .subscribe((connections) => {
        console.debug("Received connections: " + JSON.stringify(connections));
        this.connections = [];
        this.connections.push.apply(this.connections, connections);
        this.observableConnections.next(this.connections);
      });
  }
}
