import { Injectable } from '@angular/core';
import { University } from '../../model/university';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UniversityService {

  private universities: Array<University> = [];
  public observableUniversities: BehaviorSubject<Array<University>>;

  constructor(private httpClient: HttpClient) {
    this.observableUniversities = new BehaviorSubject<University[]>(this.universities);
  }

  fetchUniversities() {
    this.httpClient.get<University[]>(AppSettings.API_ENDPOINT + '/university')
      .subscribe((universities) => {
        this.universities = [];
        this.universities.push.apply(this.universities, universities);
        this.observableUniversities.next(this.universities);
      });
  }

  getUniversities() {
    return this.universities;
  }

}
