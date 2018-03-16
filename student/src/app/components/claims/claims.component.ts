import { Component, OnInit } from '@angular/core';
import { ClaimsService } from "../../services/claims/claims.service";
import { Claim } from "../../model/claim";

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  claims: Claim[];

  constructor(private claimsService: ClaimsService) { }

  ngOnInit() {
  }

  getAllClaims(): void {
    this.claims = this.claimsService.getAllClaims();
  }

}
