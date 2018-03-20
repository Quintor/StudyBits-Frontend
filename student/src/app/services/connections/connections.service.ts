import { Injectable } from '@angular/core';
import { ConnectionRecord } from "../../model/connectionRecord";

@Injectable()
export class ConnectionsService {

  constructor() { }

  getAllConnections() {
    // TODO: Add connection to backend
    return [
      new ConnectionRecord(Math.floor(Math.random() * 1000), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2), "University of Groningen", "Peter", Math.random().toString(36).slice(2)),
      new ConnectionRecord(Math.floor(Math.random() * 1000), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2), "University of Gent", "Peter", Math.random().toString(36).slice(2)),
      new ConnectionRecord(Math.floor(Math.random() * 1000), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2), "Quintor B.V.", "Peter", Math.random().toString(36).slice(2)),
      new ConnectionRecord(Math.floor(Math.random() * 1000), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2), "DUO", "Peter", Math.random().toString(36).slice(2)),
      new ConnectionRecord(Math.floor(Math.random() * 1000), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2), "Rabo Bank", "Peter", Math.random().toString(36).slice(2)),
      new ConnectionRecord(Math.floor(Math.random() * 1000), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2), "Dream Employer", "Peter", Math.random().toString(36).slice(2))
    ]
  }
}
