import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { ClaimsService } from "../../services/claims/claims.service";
import { Claim } from "../../model/claim";
import {
  MatSort,
  MatTableDataSource
} from "@angular/material";

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  claims: Claim[];

  dataSource = new MatTableDataSource(this.claims);
  columnsToDisplay = ['id', 'issuerDid', 'myDid'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private claimsService: ClaimsService) {
    this.getAllClaims();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllClaims(): void {
    this.claims = this.claimsService.getAllClaims();
    this.updateDataSource();
  }

  updateDataSource(): void {
    this.dataSource = new MatTableDataSource(this.claims);
  }

}
