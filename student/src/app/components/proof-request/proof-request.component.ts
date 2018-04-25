import { Component, OnInit } from '@angular/core';
import { ProofRequestService } from '../../services/proof-requests/proof-request.service';
import { Position } from '../../model/proofRequest';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ClaimService } from '../../services/claim/claim.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  dataSource: MatTableDataSource<Position>;
  displayedColumns = ['id', 'name', 'version', 'universityName', 'reviewed'];

  constructor(private claimService: ClaimService, private proofRequestService: ProofRequestService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.proofRequestSubscription = this.proofRequestService.observableRequests.subscribe(
      (proofRequests) => this.setDataSource(proofRequests)
    );
    this.proofRequestService.update();
  }

  private setDataSource(proofRequests: Array<Position>) {
    this.dataSource = new MatTableDataSource<Position>(proofRequests);
  }

  accept(element: Position) {
    this.claimService.fetchNewClaims().subscribe(success => {
      this.proofRequestService.accept(element).subscribe(
        success => {
          console.log('Accepted ProofRequest successfully.');
          this.proofRequestService.update();
          this.snackBar.open("Successfully sent proof!", null, {duration: 3000});
        },
        error => {
          this.snackBar.open("Failed to send proof.", null, {duration: 1000});
          console.error('Could not accept proof request: ' + JSON.stringify(error))
        }
      );
    });
  }

}
