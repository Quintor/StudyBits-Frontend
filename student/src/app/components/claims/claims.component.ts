import { Component, OnInit, ViewChild } from '@angular/core';
import { ClaimsService } from '../../services/claims/claims.service';
import { ClaimRecord } from '../../model/claimRecord';
import { MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css'],
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
export class ClaimsComponent implements OnInit {
  claims: ClaimRecord[];
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'issuerDid', 'myDid'];

  // For sorting of the table columns
  @ViewChild(MatSort) sort: MatSort;

  constructor(private claimsService: ClaimsService) {
  }

  ngOnInit(): void {
    this.claims = this.claimsService.getAllClaims();
    this.dataSource = new MatTableDataSource(this.claims);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
