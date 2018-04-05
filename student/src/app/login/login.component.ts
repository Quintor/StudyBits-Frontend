import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Student} from '../model/student';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Student = {userName: '', id: 0, originUniversity: null};
  failedLogin = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user).subscribe(() => {
      if (this.authService.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
        this.router.navigate([redirect]);
      } else {
        console.log('Failing login!');
        this.failedLogin = true;
      }
    });
  }

}
