import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { ExchangePosition } from '../../model/exchangePosition';
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
  dataSource: MatTableDataSource<ExchangePosition>;
  displayedColumns = ['universityName', 'state', 'attributes'];

  constructor(public positionService: PositionService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.positionsSubscription = this.positionService.observablePositions.subscribe(
      (positions) => this.setDataSource(positions)
    );
    this.update();
  }

  private setDataSource(positions: Array<ExchangePosition>) {
    this.dataSource = new MatTableDataSource<ExchangePosition>(positions);
  }

  update() {
    this.positionService.fetchNew().subscribe(
      success => this.positionService.fetchAll(),
      error => console.error('Error while fetching new positions.')
    )
  }

  public getKeys(map: Map<any, any>) {
    return Object.keys(map);
  }

  accept(position: ExchangePosition) {
    this.positionService.accept(position).subscribe(
      success => {
        this.snackBar.open('Application for Exchange Position successful');
        this.positionService.fetchAll();
      },
      error => {
        console.error('Error while applying for Exchange position.');
        this.snackBar.open('Error while applying for Exchange position');
      }
    )
  }
}
