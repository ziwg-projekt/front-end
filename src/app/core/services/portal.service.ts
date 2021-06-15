import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Vaccine } from '../models/vaccine';
import { User } from '../models/user';
import { Appointment } from '../models/appointment';
import { Citizen } from '../models/citizen';
import { CitizenRegisterDto } from '../models/citizen-register-dto';
import { VaccineDto } from '../models/vaccine-dto';

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

  getCitizenFromGovernmentApi(pesel: string): Observable<Citizen> {
    return this.http.get<Citizen>(this.host + `v1/citizens/all/${pesel}`);
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

  addVacine(vaccineForm): Observable<any>{
    return this.http.post(this.host + 'v1/vaccines', vaccineForm);
  }

  addVacines(vaccineForm): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    let options = { headers: headers };
    return this.http.post(this.host + 'v1/vaccines', vaccineForm,options);
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

  addCompany(company): Observable<any> {
    return this.http.post(this.host + 'v1/companies', company);
  }

  addPatientInHospital(patient): Observable<Citizen> {
    let newPatient: CitizenRegisterDto = {
      city: patient.city,
      password: patient.password,
      street: patient.street,
      street_number: patient.street_number,
      username: patient.username,
    };

    return this.http.post<Citizen>(
      this.host + `v1/auth/registration/hospital/citizen/${patient.pesel}/register`,
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
