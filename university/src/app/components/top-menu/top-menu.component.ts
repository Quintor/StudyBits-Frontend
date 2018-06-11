import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NukeService } from '../../services/nuke/nuke.service';
import { ProgressService } from '../../services/progress/progress.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  private path: string;

  constructor(private router: Router, private nukeService: NukeService, private progressService: ProgressService, private snackBar: MatSnackBar) {}

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

  nuke() {
    this.progressService.inProgress(true);

    this.nukeService.nuke().subscribe(
      success => this.snackBar.open('Reset successful', null, {duration: 3000}),
      error => this.snackBar.open('Error: Reset failure', null, {duration: 3000}),
      () => this.progressService.inProgress(false)
    );
  }

}
