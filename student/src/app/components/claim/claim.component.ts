import { Component, OnInit, ViewChild } from '@angular/core';
import { ClaimService } from '../../services/claim/claim.service';
import { ClaimRecord } from '../../model/claimRecord';
import { MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-claims',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css'],
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
export class ClaimComponent implements OnInit {
  claimSubscription: Subscription;

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'issuerDid', 'issuingUniversityName'];

  // For sorting of the table columns
  @ViewChild(MatSort) sort: MatSort;

  constructor(public claimService: ClaimService) {
  }

  ngOnInit(): void {
    this.claimSubscription = this.claimService.observableClaims.subscribe(
      (claims) => this.setDataSource(claims)
    );
    this.fetchNewClaims();
  }

  private setDataSource(claims: Array<ClaimRecord>) {
    this.dataSource = new MatTableDataSource<ClaimRecord>(claims);
  }

  fetchNewClaims() {
    this.claimService.fetchNewClaims().subscribe(success =>
        this.claimService.fetchClaims().subscribe(
          success =>
            console.debug('Fetched claims successfully.'),
          error => console.error('Could not fetch claims: ' + error.statusText)),
      error => console.error('Could not fetch new claims: ' + error.statusText));
  }

  private getValuesAsObject(claim: ClaimRecord): any {
    return JSON.parse(claim.values);
  }
}
