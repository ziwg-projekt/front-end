import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  host: string = environment.host;
  constructor(private http: HttpClient) {}

  getCompanies(): Observable<any>{
    return this.http.get(this.host + 'v1/companies');
  }
}
