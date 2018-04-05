import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "../../auth.service";
import {University} from "../../model/university";
import {Student} from "../../model/student";
import {AppModule} from "../../app.module";
import {AppSettings} from "../../app.settings";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StudentService {

  constructor(private httpClient: HttpClient, private authService : AuthService) {

  }

  onboard(student: Student, university: University) : Observable<boolean> {
    let params = new HttpParams().set("studentUserName", student.userName).set("universityName", university.name);
    console.log("Params:");
    console.log(params);
    return this.httpClient.post(AppSettings.API_ENDPOINT + "student/onboard", "", {params: params, observe: "response"})
      .map(result => {
        console.log("Onboarding complete")
        console.log(result);
        return result.status == 200;
      });
  }
}
