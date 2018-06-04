import { Injectable } from '@angular/core';
import { University } from '../../model/university';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.settings';

@Injectable()
export class UniversityService {

  universities: Array<University> = [];

  constructor(private httpClient: HttpClient) {}

  fetchUniversities() {
    this.httpClient.get<University[]>(AppSettings.API_ENDPOINT + '/university')
      .subscribe((universities) => this.universities = universities);
  }

}
