import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Vaccine } from '../models/vaccine';
import { User } from '../models/user';
import { Appointment } from '../models/appointment';
import { Citizen } from '../models/citizen';
import { AppointmentDto } from '../models/appointment-dto';
import { CitizenRegisterDto } from '../models/citizen-register-dto';

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

  getHospitalAppointments(available:boolean = false,made:boolean = false,assigned:boolean = false): Observable<any> {
    let params = new HttpParams().set("made",made.toString()).set("available", available.toString()).set("assigned", assigned.toString());
    return this.http.get(this.host + `v1/users/self/appointments`,{params:params});
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

  addCitizenToAppointmentHospital(appointment: Appointment): Observable<any> {
    return this.http.patch(
      this.host + `v1/appointments/${appointment.id}/hospital/actions/enroll`,
      {
        pesel:appointment.citizen.pesel
      }
    );
  }

  notMadeAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.patch<Appointment>(
      this.host + `v1/appointments/${appointment.id}/actions/not-made`,
      appointment
    );
  }

  madeAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.patch<Appointment>(
      this.host + `v1/appointments/${appointment.id}/actions/made`,
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

  getHospitalVaccines(id: number): Observable<Vaccine[]> {
    return this.http.get<Vaccine[]>(this.host + `v1/hospitals/${id}/vaccines`);
  }

  getCompanies(): Observable<any> {
    return this.http.get(this.host + 'v1/companies');
  }

  addHospital(hospital): Observable<any> {
    return this.http.post(this.host + 'v1/hospitals', hospital);
  }

  addPatientInHospital(patient): Observable<any> {
    let newPatient: CitizenRegisterDto = {
      city: patient.city,
      password: patient.password,
      email: patient.email,
      phone_number: patient.phone_number,
      street: patient.street,
      street_number: patient.street_number,
      username: patient.username,
    };

    return this.http.post(
      this.host + 'v1/auth/registration/hospital/citizen/register',
      newPatient
    );
  }

  getDoctors(id): Observable<any> {
    return this.http.get(this.host + `v1/hospitals/${id}/doctors`);
  }

  changeDoctorsAmount(): Observable<any> {
    return this.http.put(this.host + `v1/doctors`,{});
  }
}
