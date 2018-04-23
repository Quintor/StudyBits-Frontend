import { Injectable } from '@angular/core';
import { Student } from '../../model/student';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { ProgressService } from '../progress/progress.service';

@Injectable()
export class StudentService {

  private students: Array<Student> = [];
  public observableStudents: BehaviorSubject<Array<Student>>;

  constructor(private httpClient: HttpClient, private authService: AuthService, private progress: ProgressService) {
    this.observableStudents = new BehaviorSubject<Student[]>(this.students);
  }

  private getBaseUri(): string {
    return AppSettings.API_ENDPOINT + `${this.authService.currentUser.universityName}/admin/${this.authService.currentUser.userName}/students'}`;
  }

  fetchAll() {
    this.progress.inProgress(true);
    this.httpClient.get<Student[]>(this.getBaseUri())
      .subscribe(
        students => {
          this.students = [];
          this.students.push.apply(this.students, students);
          this.observableStudents.next(this.students);
        },
        error => console.error('Could not fetch students: ' + JSON.stringify(error)),
        () => this.progress.inProgress(false));
  }

  createNew(student: Student): Observable<boolean> {
    this.progress.inProgress(true);
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.httpClient.post<Student>(this.getBaseUri(), JSON.stringify(student), options)
      .map(res => {
        let msg = res == null ? 'Created student successfully: ' : 'Could not create student: ';
        console.log(msg + JSON.stringify(res));

        return res == null;
      });
  }

}
