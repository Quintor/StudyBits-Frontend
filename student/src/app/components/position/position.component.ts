import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Position } from '../../model/position';
import { Subscription } from 'rxjs/Subscription';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PositionService } from '../../services/position/position.service';

@Component({
  selector: 'app-proof-request',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
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
export class PositionComponent implements OnInit {

  positionsSubscription: Subscription;
  dataSource: MatTableDataSource<Position>;
  displayedColumns = ['universityName', 'state', 'attributes'];

  constructor(public positionService: PositionService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.positionsSubscription = this.positionService.observablePositions.subscribe(
      (positions) => this.setDataSource(positions)
    );
    this.positionService.fetchAll();
  }

  private setDataSource(positions: Array<Position>) {
    this.dataSource = new MatTableDataSource<Position>(positions);
  }

  update() {
    this.positionService.fetchNew().subscribe(
      success => this.positionService.fetchAll(),
      error => console.error('Error while fetching new positions.')
    )
  }
}
