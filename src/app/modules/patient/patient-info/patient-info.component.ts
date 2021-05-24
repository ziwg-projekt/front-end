import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.selfAppointments().subscribe(res => {
      console.log(res);
    });
  }

}
