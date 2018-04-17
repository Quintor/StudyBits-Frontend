import { Injectable } from '@angular/core';
import { Student } from '../../model/student';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  currentUser: Student;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(user: Student): Observable<boolean> {
    const params = new HttpParams().set('name', user.userName.toLowerCase());
    console.log('Logging in with user: ' + JSON.stringify(params));

    return this.httpClient.get<Student>(AppSettings.API_ENDPOINT + `student/${user.userName}`, {params: params}).map((user) => {
      this.isLoggedIn = true;
      this.currentUser = user;
      console.log('Logged in with user: ' + JSON.stringify(user));

      return true;
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}
