import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { ConnectionRecord } from "../../model/connectionRecord";
import { ConnectionsService } from "../../services/connections/connections.service";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css'],
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
export class ConnectionsComponent implements OnInit {
  connections: ConnectionRecord[];
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'role', 'newcomerName'];
  detailDisplayedColumns = ['nonce', 'did'];

  // For sorting of the table columns
  @ViewChild(MatSort) sort: MatSort;

  // For expanding rows
  isExpansionDetailRow = ( index, row ) => row.hasOwnProperty('appDetailRow');

  constructor( private connectionsService: ConnectionsService ) { }

  ngOnInit(): void {
    this.connections = this.connectionsService.getAllConnections();
    console.log(this.connections);
    this.dataSource = new MatTableDataSource(this.connections);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

}
