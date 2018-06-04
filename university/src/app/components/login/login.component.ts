import { Component, OnInit } from '@angular/core';
import { University } from '../../model/university';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: University = new University('gent', 'admin');
  failedLogin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

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
