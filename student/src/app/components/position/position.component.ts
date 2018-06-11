import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { ExchangePosition } from '../../model/exchangePosition';
import { Subscription } from 'rxjs/Subscription';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PositionService } from '../../services/position/position.service';
import { PositionState } from '../../enums/PositionState';
import { ApplicationService } from '../../services/application/application.service';

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
  displayedColumns = ['universityName', 'state', 'attributes', 'actions'];

  constructor(public positionService: PositionService, private applicationService: ApplicationService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.positionsSubscription = this.positionService.observablePositions.subscribe(
      (positions) => this.setDataSource(positions)
    );
    this.positionService.update();
  }

  private setDataSource(positions: Array<ExchangePosition>) {
    this.dataSource = new MatTableDataSource<ExchangePosition>(positions);
  }

  public getKeys(map: Map<any, any>): Array<string> {
    return Object.keys(map);
  }

  public isOpen(position: ExchangePosition): boolean {
    return position.state.toString() === PositionState[PositionState.OPEN]
  }

  public hasApplied(position: ExchangePosition): boolean {
    let applicationsForPosition = this.applicationService.applications.filter(application => application.exchangePositionModel.proofRecordId == position.proofRecordId);
    return applicationsForPosition.length != 0;
  }

  public accept(position: ExchangePosition): void {
    this.positionService.accept(position).subscribe(
      success => {
        this.snackBar.open('Application for Exchange Position successful', null, {duration: 3000});
        this.applicationService.update();
        this.positionService.update();
      },
      error => {
        console.error('Error: Could not apply for Exchange position.');
        this.snackBar.open('Error: Could not apply for Exchange position', null, {duration: 3000});
      }
    )
  }
}
