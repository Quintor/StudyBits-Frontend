import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../../services/progress/progress.service';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {

  constructor(public progress: ProgressService) { }

  ngOnInit() {
  }


}
