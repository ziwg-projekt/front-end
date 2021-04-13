import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Citizen } from '../models/citizen';

@Injectable({
  providedIn: 'root',
})
export class CitizensService {
  host: string = environment.host;
  constructor(private http: HttpClient) {}

  getPatient(pesel: string): Observable<Citizen> {
    return this.http.get<Citizen>(this.host + `v1/citizens/${pesel}`);
  }

  getPatientAppointments(pesel: string): Observable<any> {
    return this.http.get(this.host + `v1/citizens/${pesel}/appointments`);
  }

  getPatients(): Observable<Citizen[]> {
    return this.http.get<Citizen[]>(this.host + `v1/citizens`);
  }
}
