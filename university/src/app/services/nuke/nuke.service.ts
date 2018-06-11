import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { concatMap } from 'rxjs/operators';

@Injectable()
export class NukeService {

  constructor(private httpClient: HttpClient) { }

  public nuke(): Observable<boolean> {
    let urlUniversityNuke = AppSettings.API_UNIVERSITY_ENDPOINT + 'test/nuke';
    let urlStudentNuke = AppSettings.API_STUDENT_ENDPOINT + 'test/nuke';
    let urlStudentSeed = AppSettings.API_STUDENT_ENDPOINT + 'test/seed';

    return this.httpClient.delete(urlUniversityNuke, {observe: 'response'}).pipe(
      concatMap((res: HttpResponse<Object>) => this.httpClient.delete(urlStudentNuke, {observe: 'response'})),
      concatMap((res: HttpResponse<Object>) => this.httpClient.post(urlStudentSeed, null, {observe: 'response'})
        .map((res: HttpResponse<Object>) => res.status == 200)
      )
    );
  }
}
