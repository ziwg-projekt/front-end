import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {CitizenNotifyModel} from '../models/citizen-notify.model';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';
import {Hospital} from '../models/hospital';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public backendUrl = 'http://40.112.78.100:8080/api';
  public mapEvolved = new Subject<void>();

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

  public getHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(`${environment.host}v1/hospitals`).pipe(
      map((item: any) => item.content));
  }

  public getAppointments(hospitalId: number): Observable<any> {
    return this.http.get(`${environment.host}v1/hospitals/${hospitalId}/appointments`).pipe(
      map((item: any) => item.content));
  }

  public appointmentSign(id: number): Observable<any> {
    return this.http.patch(`${environment.host}v1/appointments/${id}/actions/enroll`, null);
  }

  public selfAppointments(): Observable<any> {
    return this.http.get(`${environment.host}v1/users/self/appointments?available=false&made=false`).pipe(
      map((item: any) => item.content));
  }

  public cancelAppointment(id: number): Observable<any> {
    return this.http.patch(`${environment.host}v1/appointments/${id}/actions/cancel`, null);
  }

  getHospitalsCounter(): Observable<any> {
    return this.http.get(`${environment.host}v1/hospitals`).pipe(
      map((h: any) => {
        return h.content.length;
      })
    );
  }

  getVaccinetedCounter(): Observable<any> {
    return this.http.get(`${environment.host}v1/citizens/vaccinated`);
  }
}


//api/v1/auth/registration-code/generate

///api/v1/auth/registration-code/verify/1834278413931413208831
