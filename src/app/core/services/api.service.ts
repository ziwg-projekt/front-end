import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CitizenNotifyModel} from '../models/citizen-notify.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public backendUrl = 'http://40.112.78.100:8080/api';
  // public backendUrl = `http://kamienicznik.com.pl/backend`;

  constructor(private http: HttpClient) { }

  public sendCitizenNotify(personalData: CitizenNotifyModel): Observable<any> {
    return this.http.post(`${environment.host}v1/auth/registration/citizen/notify`, personalData);
  }

}


//api/v1/auth/registration-code/generate

///api/v1/auth/registration-code/verify/1834278413931413208831
