import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { University } from '../../model/university';
import { Student } from '../../model/student';
import { AppSettings } from '../../app.settings';
import { Observable } from 'rxjs/Observable';
import { ProgressService } from '../progress/progress.service';

@Injectable()
export class StudentService {

  students: Student[] = [];

  constructor(private httpClient: HttpClient, private progress: ProgressService) {}

  connect(student: Student, university: University): Observable<boolean> {
    this.progress.inProgress(true);
    const params = new HttpParams().set('studentUserName', student.userName).set('universityName', university.name);
    return this.httpClient.post(AppSettings.API_ENDPOINT + 'student/connect', '', {params: params, observe: 'response'})
      .map(result => {
        this.progress.inProgress(false);
        return result.status == 200;
      });
  }

  public getByName(userName: string): Student {
    return this.students.find(x => x.userName == userName);
  }
}
