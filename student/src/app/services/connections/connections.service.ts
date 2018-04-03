import { Injectable } from '@angular/core';
import { ConnectionRecord } from "../../model/connectionRecord";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "../../auth.service";
import {AppSettings} from "../../app.settings";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ConnectionsService {

  constructor(private httpClient: HttpClient) { }

  getAllConnections(studentId: number) : Observable<ConnectionRecord[]> {
    return this.httpClient.get<ConnectionRecord[]>(AppSettings.API_ENDPOINT + `student/${studentId}/connections`)
  }
}
