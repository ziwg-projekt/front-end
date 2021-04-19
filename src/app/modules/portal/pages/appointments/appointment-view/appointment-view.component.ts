import { Component, Input, OnInit } from '@angular/core';
import { AppointmentState } from 'src/app/core/enums/appointment-state.enum';
import { Appointment } from 'src/app/core/models/appointment';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss'],
})
export class AppointmentViewComponent implements OnInit {
  @Input() appointment: Appointment;
  appointmentState = AppointmentState;
  constructor() {}

  ngOnInit() {}
}
