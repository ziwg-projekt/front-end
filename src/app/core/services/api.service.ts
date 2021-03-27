import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public backendUrl = 'http://40.112.78.100:8080/api';
  // public backendUrl = `http://kamienicznik.com.pl/backend`;

  constructor(private http: HttpClient) { }

  public sendPersonalData(personalData): Observable<any> {
    return this.http.post(`${this.backendUrl}/v1/auth/registration-code/generate`, personalData);
  }
}


//api/v1/auth/registration-code/generate

///api/v1/auth/registration-code/verify/1834278413931413208831
