import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../model/user";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : User = new User("");

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user).subscribe(() => {
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
        this.router.navigate([redirect]);
      }
    });
  }

}
