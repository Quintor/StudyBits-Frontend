import { Injectable } from '@angular/core';

@Injectable()
export class ProgressService {

  fetching: boolean = false;

  constructor() { }

  inProgress(value: boolean) {
    this.fetching = value;
  }
}
