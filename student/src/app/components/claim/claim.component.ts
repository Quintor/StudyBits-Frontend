import { Component, OnInit, ViewChild } from '@angular/core';
import { ClaimService } from '../../services/claim/claim.service';
import { ClaimRecord } from '../../model/claimRecord';
import { MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { ProofRequestService } from '../../services/proof-requests/proof-request.service';
import { ProofRequest } from '../../model/proofRequest';

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
  proofRequestSubscription: Subscription;

  dataSourceRequests: MatTableDataSource<any>;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'issuerDid', 'issuingUniversityName'];
  displayedColumnsRequests = ['id', 'name', 'version', 'universityName'];

  // For sorting of the table columns
  @ViewChild(MatSort) sort: MatSort;

  constructor(private claimService: ClaimService, private proofRequestService: ProofRequestService) {
  }

  ngOnInit(): void {
    this.claimSubscription = this.claimService.observableClaims.subscribe(
      (claims) => this.setDataSource(claims)
    );
    this.proofRequestSubscription = this.proofRequestService.observableClaims.subscribe(
      (proofRequests) => this.setRequestsDataSource(proofRequests)
    );
    this.fetchNewClaims();
    this.fetchNewProofRequests();
  }

  private setDataSource(claims: Array<ClaimRecord>) {
    this.dataSource = new MatTableDataSource<ClaimRecord>(claims);
  }

  private setRequestsDataSource(proofRequests: Array<ProofRequest>) {
    this.dataSourceRequests = new MatTableDataSource<ProofRequest>(proofRequests);
  }

  update() {
    this.fetchNewClaims();
    this.fetchNewProofRequests();
  }

  fetchNewClaims() {
    this.claimService.fetchNewClaims().subscribe(success =>
        this.claimService.fetchClaims().subscribe(
          success =>
            console.debug('Fetched claims successfully.'),
          error => console.error('Could not fetch claims: ' + error.statusText)),
      error => console.error('Could not fetch new claims: ' + error.statusText));
  }
  fetchNewProofRequests() {
    this.proofRequestService.fetchNewProofRequests().subscribe(success =>
        this.proofRequestService.fetchProofRequests().subscribe(
          success =>
            console.debug('Fetched proof requests successfully.'),
          error => console.error('Could not fetch proof requests: ' + error.statusText)),
      error => console.error('Could not fetch new proof requests: ' + error.statusText));
  }

  private getElementAsJson(obj: any): any {
    return JSON.parse(obj);
  }
}
