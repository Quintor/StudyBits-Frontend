import { Injectable } from '@angular/core';
import { University } from '../../model/university';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../../app.settings';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  currentUser: University;

  constructor(private httpClient: HttpClient) {
  }

  login(user: University): Observable<boolean> {
    const params = new HttpParams().set('name', user.name);

    return this.httpClient.get<University[]>(AppSettings.API_ENDPOINT + 'student', {params: params}).map((users) => {
      if (users.length === 0) {
        return false;
      }
      this.isLoggedIn = true;
      this.currentUser = users[0];
      return true;
    });
  }
}
