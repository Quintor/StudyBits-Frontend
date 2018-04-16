import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProofRequestService } from '../../services/proof-requests/proof-request.service';
import { ProofRequest } from '../../model/proofRequest';
import { ClaimService } from '../../services/claim/claim.service';

@Component({
  selector: 'app-proof-request',
  templateUrl: './proof-request.component.html',
  styleUrls: ['./proof-request.component.css'],
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
export class ProofRequestComponent implements OnInit {

  proofRequestSubscription: Subscription;

  dataSource: MatTableDataSource<ProofRequest>;
  displayedColumns = ['id', 'name', 'version', 'universityName'];

  // For sorting of the table columns
  @ViewChild(MatSort) sort: MatSort;

  constructor(private proofRequestService: ProofRequestService, private claimService: ClaimService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.proofRequestSubscription = this.proofRequestService.observableRequests.subscribe(
      (proofRequests) => this.setDataSource(proofRequests)
    );
    this.update();
  }

  private setDataSource(proofRequests: Array<ProofRequest>) {
    this.dataSource = new MatTableDataSource<ProofRequest>(proofRequests);
  }

  update() {
    this.proofRequestService.fetchNewProofRequests().subscribe(success =>
        this.proofRequestService.fetchProofRequests().subscribe(
          success =>
            console.debug('Fetched proof requests successfully.'),
          error => console.error('Could not fetch proof requests: ' + error.statusText)),
      error => console.error('Could not fetch new proof requests: ' + error.statusText));
  }

  accept(element: ProofRequest) {
    this.claimService.fetchNewClaims().subscribe(success => {
      this.proofRequestService.accept(element).subscribe(
        success => {
          console.log('Accepted ProofRequest successfully.');
          this.update();
          this.snackBar.open("Successfully sent proof!", null, {duration: 3000});
        },
        error => {
          this.snackBar.open("Failed to send proof.", null, {duration: 1000});
          console.error('Could not accept proof request: ' + JSON.stringify(error))
        }
      );
    });
  }

  private getElementAsJson(obj: any): any {
    return JSON.parse(obj);
  }

}
