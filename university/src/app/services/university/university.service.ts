import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SchemaDefinition } from '../../model/schemaDefinition';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.settings';

@Injectable()
export class UniversityService {

  schemaDefinitions: Array<SchemaDefinition> = [];

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  private getBaseUri(): string {
    return AppSettings.API_ENDPOINT + `${this.authService.currentUser.universityName}/admin/${this.authService.currentUser.userName}/`;
  }

  fetchSchemaDefinitions() {
    this.httpClient.get<Array<SchemaDefinition>>(this.getBaseUri() + '/schemas')
      .subscribe(res => this.schemaDefinitions = res);
  }

}
