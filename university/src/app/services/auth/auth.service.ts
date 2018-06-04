import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { Router } from '@angular/router';
import { University } from '../../model/university';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  currentUser: University;

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(user: University): Observable<boolean> {
    console.log('Logging in with user: ' + JSON.stringify(user));

    return this.httpClient.get<University>(AppSettings.API_ENDPOINT + `${user.universityName}/admin/${user.userName}`, {observe: 'response'})
      .map(res => {
        if (res.status == 200) {
          this.isLoggedIn = true;
          this.currentUser = user;
        }
        const msg = res.status == 200 ? 'Logged in with user: ' : 'Could not log in with user: ';
        console.log(msg + JSON.stringify(user));

        return res.status == 200;
      });
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}
