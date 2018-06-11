import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SchemaDefinitionModel } from '../../model/schemaDefinition';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.settings';

@Injectable()
export class UniversityService {

  schemaDefinitions: Array<SchemaDefinitionModel> = [];

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  private getBaseUri(): string {
    return AppSettings.API_UNIVERSITY_ENDPOINT + `${this.authService.currentUser.universityName}/admin/${this.authService.currentUser.userName}/`;
  }

  fetchSchemaDefinitions() {
    this.httpClient.get<Array<SchemaDefinitionModel>>(this.getBaseUri() + '/schemas', {observe: 'response'})
      .subscribe(res => {
        if (res.status == 200) {
          this.schemaDefinitions = res.body;
        }

        const msg = res.status == 200 ? 'Fetched SchemaDefinitions: ' : 'Error while fetching SchemaDefinitions: ';
        console.log(msg + JSON.stringify(res));
      });
  }
}
