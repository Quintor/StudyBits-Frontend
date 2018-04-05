import { Injectable } from '@angular/core';
import { Student } from '../../model/student';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../../app.settings';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  currentUser: Student;

  constructor(private httpClient: HttpClient) {
  }

  login(user: Student): Observable<boolean> {
    const params = new HttpParams().set('name', user.userName);

    return this.httpClient.get<Student[]>(AppSettings.API_ENDPOINT + 'student', {params: params}).map((users) => {
      if (users.length === 0) {
        return false;
      }
      this.isLoggedIn = true;
      this.currentUser = users[0];
      return true;
    });
  }
}
