import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router
} from "@angular/router";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  private path: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.subscribeForNavigationEvents();
  }

  subscribeForNavigationEvents() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let newPath = event.urlAfterRedirects.slice(1);
        this.path = newPath.charAt(0).toUpperCase() + newPath.slice(1);
      }
    })
  }



}
