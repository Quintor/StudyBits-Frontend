import { Injectable } from '@angular/core';
import { University } from '../../model/university';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../../app.settings';

@Injectable()
export class UniversityService {

  constructor(private httpClient: HttpClient) {
  }

  getUniversities(): Observable<University[]> {
    return this.httpClient.get<University[]>(AppSettings.API_ENDPOINT + '/university');
  }
}
