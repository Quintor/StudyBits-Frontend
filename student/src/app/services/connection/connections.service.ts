import { Injectable } from '@angular/core';
import { ConnectionRecord } from '../../model/connectionRecord';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConnectionsService {

  constructor(private httpClient: HttpClient) { }

  getAllConnections(studentUsername: string): Observable<ConnectionRecord[]> {
    return this.httpClient.get<ConnectionRecord[]>(AppSettings.API_ENDPOINT + `student/${studentUsername}/connections`);
  }
}
