import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { PositionService } from '../../services/position/position.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CreatePositionDialogComponent } from './create-position-dialog/create-position-dialog.component';
import { AuthService } from '../../services/auth/auth.service';
import { UniversityService } from '../../services/university/university.service';
import { Position } from '../../model/position';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({
        height: '0px',
        minHeight: '0',
        visibility: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        visibility: 'visible'
      })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PositionsComponent implements OnInit {

  positionSubscription: Subscription;
  dataSource: MatTableDataSource<Position>;
  displayedColumns = ['universityName', 'isOpen', 'attributes'];

  constructor(private positionService: PositionService, private universityService: UniversityService, private authService: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.positionSubscription = this.positionService.observablePositions.subscribe(
      (positions) => this.setDataSource(positions)
    );
    this.positionService.fetchAll();
    this.universityService.fetchSchemaDefinitions();
  }

  private setDataSource(positions: Array<Position>) {
    this.dataSource = new MatTableDataSource<Position>(positions);
  }

  getKeys(obj) {
    let map = <Map<string, string>> obj;

    console.log(map);
    return Array.from(map.keys());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePositionDialogComponent, {
      width: '415px',
      data: {
        universityName: this.authService.currentUser.universityName,
        schemas: this.universityService.schemaDefinitions
      },
    });

    dialogRef.afterClosed().subscribe(position => {
      if (position != null) {
        this.positionService.create(position).subscribe(
          success => {
            this.snackBar.open('Position created successfully');
            this.positionService.fetchAll();
          },
          error => {
            this.snackBar.open('Error: Could not create Student');
            console.error('Could not create new Student: ' + JSON.stringify(error));
          }
        );
      }
    });
  }
}
