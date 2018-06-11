import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ClaimService } from '../../services/claim/claim.service';
import { ClaimRecord } from '../../model/claimRecord';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClaimValue } from '../../model/claimValue';

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
  displayedColumns = ['label', 'schemaKeyName', 'issuingUniversityName'];

  // For sorting of the table columns
  @ViewChild(MatSort) sort: MatSort;

  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.claimSubscription = this.claimService.observableClaims.subscribe(
      (claims) => this.setDataSource(claims)
    );
    this.update();
  }

  private setDataSource(claims: Array<ClaimRecord>) {
    this.dataSource = new MatTableDataSource<ClaimRecord>(claims);
  }

  update() {
    this.claimService.fetchNewClaims().subscribe(success => {
      if (success) {
        this.claimService.fetchClaims().subscribe(() => {});
      } else {
        console.error('Could not fetch new claims.');
      }
    });
  }

  parseValuesToObjects(obj: string): ClaimValue[] {
    let asJSON = JSON.parse(obj);
    let objects = [];

    console.log(asJSON)

    Object.keys(asJSON).forEach(key => {
      objects.push(new ClaimValue(key, asJSON[key].raw, asJSON[key].encoded))
    });

    console.log(objects);

    return objects;
  }

  getType(schemaId: string): String {
    return schemaId.split(":", 3)[2];
  }
}
