import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { ClaimsService } from '../../services/claims/claims.service';
import { ClaimRecord } from '../../model/claimRecord';
import {
  MatSnackBar,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import 'rxjs/add/observable/of';
import { AuthService } from '../../auth.service';

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
  displayedColumns = ['id', 'issuerDid', 'uniName'];

  // For sorting of the table columns
  @ViewChild(MatSort) sort: MatSort;

  constructor( private claimsService: ClaimsService , private authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getClaims();
  }

  private getClaims() {
    console.log("Getting claims...");
    this.claimsService.getAllClaims(this.authService.currentUser.userName).subscribe((claimrecords) => {
      console.log("Gotten claims!");
      this.claims = claimrecords;
      this.dataSource = new MatTableDataSource(this.claims);
    });
  }

  private getValuesAsObject(claim: ClaimRecord) : any {
    return JSON.parse(claim.values);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  refreshClaims(): void {
    this.claimsService.refreshClaims(this.authService.currentUser.userName).subscribe((success) => {
      const message = success ? 'Getting claims succeeded' : 'Getting claims failed';
      this.snackBar.open(message, null, {duration: 1000});
      this.getClaims();
    })
  }
}
