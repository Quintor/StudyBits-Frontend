import { Component, OnInit } from '@angular/core';
import { ProofRequestService } from '../../services/proof-requests/proof-request.service';
import { ProofRequest } from '../../model/proofRequest';
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
  dataSource: MatTableDataSource<ProofRequest>;
  displayedColumns = ['id', 'name', 'version', 'universityName', 'reviewed'];

  constructor(private claimService: ClaimService, private proofRequestService: ProofRequestService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.proofRequestSubscription = this.proofRequestService.observableRequests.subscribe(
      (proofRequests) => this.setDataSource(proofRequests)
    );
    this.proofRequestService.update();
  }

  private setDataSource(proofRequests: Array<ProofRequest>) {
    this.dataSource = new MatTableDataSource<ProofRequest>(proofRequests);
  }



}
