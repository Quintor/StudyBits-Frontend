import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ConnectionRecord } from '../../model/connectionRecord';
import { ConnectionService } from '../../services/connection/connection.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { UniversityService } from '../../services/universities/university.service';
import { AuthService } from '../../services/auth/auth.service';
import { StudentService } from '../../services/student/student.service';
import { Subscription } from 'rxjs/Subscription';
import { ProofRequestService } from '../../services/proof-requests/proof-request.service';
import { ProofRequest } from '../../model/proofRequest';
import { ClaimService } from '../../services/claim/claim.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css'],
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

export class ConnectionComponent implements OnInit {
  connectionSubscription: Subscription;

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'studentUserName', 'universityName', 'confirmed', 'actions'];

  // For sorting of the table columns
  @ViewChild(MatSort) sort: MatSort;

  constructor(private connectionService: ConnectionService, private dialog: MatDialog, private snackBar: MatSnackBar, private universityService: UniversityService, private authService: AuthService, private studentService: StudentService, private proofRequestService: ProofRequestService, private claimService: ClaimService) {
  }

  ngOnInit(): void {
    this.connectionSubscription = this.connectionService.observableConnections.subscribe(
      (connections) => this.setDataSource(connections)
    );
    this.connectionService.fetchAll();
    this.universityService.fetchUniversities();
    this.proofRequestService.update();
  }

  private setDataSource(connections: Array<ConnectionRecord>) {
    this.dataSource = new MatTableDataSource<ConnectionRecord>(connections);
  }

  public hasOpenUserProofs(element: ConnectionRecord) {
    let userProof = this.getUserProofForUniversity(element.universityName).pop();
    return userProof != null && !userProof.isReviewed;
  }

  public proveIdentity(element: ConnectionRecord) {
    let userProof = this.getUserProofForUniversity(element.universityName).pop();
    this.accept(userProof);
  }

  public getProofRequestAttributesFromConnection(element: ConnectionRecord) {
    let proofRequest = this.getUserProofForUniversity(element.universityName)[0];
    return proofRequest.attributes;
  }

  private getUserProofForUniversity(universityName: string): Array<ProofRequest> {
      return this.proofRequestService.proofRequests.filter(
        proofRequest => (proofRequest.universityName === universityName && proofRequest.name === "UserProof")
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '250px',
      data: {universities: this.universityService.universities}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.studentService.connect(this.authService.currentUser, result).subscribe((result) => {
            const message = result ? 'Onboarding succeeded' : 'Onboarding failed';
            console.log(message);
            this.snackBar.open(message, null, {duration: 3000});
            this.connectionService.fetchAll();
            this.proofRequestService.update();
          }
        );
        console.log(result);
      }
    });
  }

  accept(element: ProofRequest) {
    this.claimService.fetchNewClaims().subscribe(success => {
      this.proofRequestService.accept(element).subscribe(
        success => {
          console.log('Accepted ProofRequest successfully.');
          this.connectionService.fetchAll();
          this.proofRequestService.update();
          this.snackBar.open("Successfully proved Identity!", null, {duration: 3000});
        },
        error => {
          this.snackBar.open("Failed to prove Identity.", null, {duration: 1000});
          console.error('Could not accept proof request: ' + JSON.stringify(error))
        }
      );
    });
  }
}


