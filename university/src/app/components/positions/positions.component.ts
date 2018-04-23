import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource } from '@angular/material';
import { PositionService } from '../../services/position/position.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  positionSubscription: Subscription;
  dataSource: MatTableDataSource<Position>;
  displayedColumns = ['id', 'name', 'version', 'universityName', 'reviewed'];

  constructor(private positionService: PositionService) { }

  ngOnInit(): void {
    this.positionSubscription = this.positionService.observablePositions.subscribe(
      (positions) => this.setDataSource(positions)
    );
    this.positionService.fetch();
  }

  private setDataSource(positions: Array<Position>) {
    this.dataSource = new MatTableDataSource<Position>(positions);
  }
}
