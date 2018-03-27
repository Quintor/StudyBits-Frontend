import { Injectable } from '@angular/core';
import {User} from "./model/user";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/do'

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  currentUser: User;
  constructor() { }

  login(user: User): Observable<boolean> {
    return Observable.of(true).delay(100)
      .do(val => {
        this.currentUser = user;
        this.isLoggedIn = true;
      });
  }
}
