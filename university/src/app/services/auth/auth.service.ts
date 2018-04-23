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
    console.log('Logging in with user: ' + JSON.stringify(this.currentUser));

    return this.httpClient.get(AppSettings.API_ENDPOINT + `/${this.currentUser.universityName}/admin/${this.currentUser.userName}`, {observe: 'response'}).map((res) => {
      if (res.status == 200) {
        this.isLoggedIn = true;
        console.log('Logged in with user: ' + JSON.stringify(this.currentUser));
      } else {
        console.error('Could not log in with user: ' + JSON.stringify(this.currentUser));
      }

      return res.status == 200;
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}
