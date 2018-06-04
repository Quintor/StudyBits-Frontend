import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ExchangeApplication } from '../../model/exchangeApplication';
import { ApplicationService } from '../../services/application/application.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  applicationsSubscription: Subscription;
  dataSource: MatTableDataSource<ExchangeApplication>;
  displayedColumns = ['universityName', 'state', 'attributes'];

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.applicationsSubscription = this.applicationService.observableApplications.subscribe(
      (applications) => this.setDataSource(applications)
    );
    this.update();
  }

  private setDataSource(positions: Array<ExchangeApplication>) {
    this.dataSource = new MatTableDataSource<ExchangeApplication>(positions);
  }

  update() {
    this.applicationService.fetchNew().subscribe(
      success => this.applicationService.fetchAll(),
      error => console.error('Error while fetching new applications.')
    );
  }

  public getKeys(map: Map<any, any>) {
    return Object.keys(map);
  }

}
