import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CitizenNotifyModel} from '../models/citizen-notify.model';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public backendUrl = 'http://40.112.78.100:8080/api';

  // public backendUrl = `http://kamienicznik.com.pl/backend`;

  constructor(private http: HttpClient) {
  }

  public customPostAction(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${environment.host.split('/api')[0]}${endpoint}`, data)
      .pipe(catchError(err => throwError(err)));
  }

  public sendCitizenNotify(personalData: CitizenNotifyModel): Observable<any> {
    return this.http.post(`${environment.host}v1/auth/registration/citizen/notify`, personalData);
  }

}


//api/v1/auth/registration-code/generate

///api/v1/auth/registration-code/verify/1834278413931413208831
