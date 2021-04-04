import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Vaccine } from '../models/vaccine';

@Injectable({
  providedIn: 'root',
})
export class VaccinesService {
  constructor(private http: HttpClient) {}

  /*addVacine(vaccineForm: Vaccine): Observable<Vaccine> {
  return this.http.post<Vaccine>(this.host + 'v1/vaccines', {
    code: vaccineForm.code,
    company: vaccineForm.company,
    hospital: vaccineForm.hospital,
    state: vaccineForm.state,
    type: vaccineForm.type
  });
}*/
}
