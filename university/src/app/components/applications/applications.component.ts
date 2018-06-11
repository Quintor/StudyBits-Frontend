import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationService } from '../../services/application/application.service';
import { ExchangeApplication } from '../../model/exchangeApplication';
import { ApplicationState } from '../../enums/ApplicationState';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'],
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
export class ApplicationsComponent implements OnInit {

  applicationSubscription: Subscription;
  dataSource: MatTableDataSource<ExchangeApplication>;
  displayedColumns = ['userName', 'state', 'attributes', 'proof', 'actions'];

  constructor(private applicationService: ApplicationService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.applicationSubscription = this.applicationService.observableApplications.subscribe(
      (applications) => this.setDataSource(applications)
    );
    this.applicationService.fetchAll();
  }

  private setDataSource(positions: Array<ExchangeApplication>) {
    this.dataSource = new MatTableDataSource<ExchangeApplication>(positions);
  }

  public getKeys(map: Map<any, any>) {
    return Object.keys(map).filter(key => key !== "id").sort()
  }

  public isOpen(position: ExchangeApplication): boolean {
    return position.state.toString() === ApplicationState[ApplicationState.APPLIED]
  }

  accept(application: ExchangeApplication) {
    application.state = ApplicationState.ACCEPTED;
    console.log('Accepting Application: ' + JSON.stringify(application));

    this.applicationService.accept(application).subscribe(
      success => {
        console.log('Accepted Application successfully.');
        this.applicationService.fetchAll();
        this.snackBar.open('Successfully accepted Application!', null, {duration: 3000});
      },
      error => {
        this.snackBar.open('Failed to accept application.', null, {duration: 1000});
        console.error('Could not accept application: ' + JSON.stringify(error));
      }
    );
  }
}
