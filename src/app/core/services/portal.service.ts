import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Vaccine } from '../models/vaccine';
import { User } from '../models/user';
import { Doctor } from '../models/doctor';
import { Appointment } from '../models/appointment';
import { Citizen } from '../models/citizen';
import { AppointmentDto } from '../models/appointment-dto';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  host: string = environment.host;
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.host + 'v1/users/' + id);
  }

  getPatient(pesel: string): Observable<Citizen> {
    return this.http.get<Citizen>(this.host + `v1/citizens/${pesel}`);
  }

  getPatientAppointments(pesel: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      this.host + `v1/citizens/${pesel}/appointments`
    );
  }

  getHospitalAppointments(): Observable<any> {
    return this.http.get(
      this.host + `v1/appointments`
    );
  }

  getPatients(): Observable<any> {
    return this.http.get<any>(this.host + `v1/citizens`);
  }

  editPatientData(pesel: string, citizenForm): Observable<Citizen> {
    citizenForm.address.city = citizenForm.city;
    citizenForm.address.street = citizenForm.street;
    citizenForm.address.street_number = citizenForm.street_number;
    return this.http.put<Citizen>(
      this.host + `v1/citizens/${pesel}`,
      citizenForm
    );
  }

  addAppointment(appointment: AppointmentDto): Observable<Appointment> {
    return this.http.post<Appointment>(
      this.host + `v1/appointments`,
      appointment
    );
  }

  addVacine(vaccineForm: Vaccine): Observable<Vaccine> {
    return this.http.post<Vaccine>(this.host + 'v1/vaccines', {
      code: vaccineForm.code,
      company: vaccineForm.company,
      hospital: vaccineForm.hospital,
      state: vaccineForm.state,
      type: vaccineForm.type,
    });
  }

  getStatistics(id: number): Observable<any> {
    return this.http.get(this.host + `v1/hospitals/${id}/vaccines/stats`);
  }

  getDoctors(id: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.host + `v1/hospitals/${id}/doctors`);
  }

  getHospitalVaccines(id: number): Observable<Vaccine[]> {
    return this.http.get<Vaccine[]>(this.host + `v1/hospitals/${id}/vaccines`);
  }

  getCompanies(): Observable<any> {
    return this.http.get(this.host + 'v1/companies');
  }

  addHospital(hospital): Observable<any> {
    return this.http.post(this.host + 'v1/hospitals',hospital);
  }
}
