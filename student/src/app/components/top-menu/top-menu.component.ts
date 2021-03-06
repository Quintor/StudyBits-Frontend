import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  private path: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.subscribeForNavigationEvents();
  }

  subscribeForNavigationEvents() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const newPath = event.urlAfterRedirects.slice(1);
        this.path = newPath.charAt(0).toUpperCase() + newPath.slice(1);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
