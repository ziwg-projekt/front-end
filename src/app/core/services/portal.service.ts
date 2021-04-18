import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Vaccine } from '../models/vaccine';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { Hospital } from '../models/hospital';
import { map } from 'rxjs/operators';
import { Doctor } from '../models/doctor';
import { Appointment } from '../models/appointment';
import { Citizen } from '../models/citizen';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  host: string = environment.host;
  private currentHospital: BehaviorSubject<Hospital> = new BehaviorSubject(null);
  constructor(private http: HttpClient, private authService: AuthService) {
      this.loadHospital();
  }

  get currentHospitalValue(): Observable<Hospital> {
    return this.currentHospital.asObservable();
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.host + 'v1/users/' + id);
  }

  loadHospital() {
    this.getUser(this.authService.userId).pipe(
      map((u) => {
        return u.hospital;
      })
    ).subscribe(h=>{
      this.currentHospital.next(h);
    });
  }

  getHospitalStatistics(): Observable<any> {
    return this.http.get(this.host + `v1/hospitals/${this.currentHospital.value.id}/vaccines/stats`);
  }

  getPatient(pesel: string): Observable<Citizen> {
    return this.http.get<Citizen>(this.host + `v1/citizens/${pesel}`);
  }

  getPatientAppointments(pesel: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.host + `v1/citizens/${pesel}/appointments`);
  }

  getPatients(): Observable<Citizen[]> {
    return this.http.get<Citizen[]>(this.host + `v1/citizens`);
  }

  addAppointment(appointment:Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.host + `v1/appointments`,appointment);
  }

  addVacine(vaccineForm: Vaccine): Observable<Vaccine> {
    return this.http.post<Vaccine>(this.host + 'v1/vaccines', {
      code: vaccineForm.code,
      company: vaccineForm.company,
      hospital: vaccineForm.hospital,
      state: vaccineForm.state,
      type: vaccineForm.type
    });
  }

  getStatistics(id: number): Observable<any> {
    return this.http.get(this.host + `v1/hospitals/${id}/vaccines/stats`);
  }

  getDoctors(id: number):Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.host + `v1/hospitals/${id}/doctors`);
  }

  getHospitalVaccines(id: number): Observable<Vaccine[]>{
    return this.http.get<Vaccine[]>(this.host + `v1/hospitals/${id}/vaccines`);
  }

  getCompanies(): Observable<any>{
    return this.http.get(this.host + 'v1/companies');
  }
}
