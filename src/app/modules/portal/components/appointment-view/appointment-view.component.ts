import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentState } from 'src/app/core/enums/appointment-state.enum';
import { Appointment } from 'src/app/core/models/appointment';
import { AppointmentConfirmDialogComponent } from '../appointment-confirm-dialog/appointment-confirm-dialog.component';
@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss'],
})
export class AppointmentViewComponent implements OnInit {
  @Input() appointment: Appointment;
  @Output() cancelAppointment = new EventEmitter();
  @Output() doneAppointment = new EventEmitter();
  appointmentState = AppointmentState;
  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  cancelAppointmentDialog(event: Event) {
    event.stopPropagation();
    this.openDialog('cancel');
  }

  doneAppointmentDialog(event: Event) {
    event.stopPropagation();
    this.openDialog('confirm');
  }

  openDialog(mode) {
    const dialogRef = this.dialog.open(AppointmentConfirmDialogComponent, {
      width: '500px',
      data: {
        mode: mode,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (mode == 'cancel') {
          this.cancelAppointment.emit();
        } else if (mode == 'confirm') {
          this.doneAppointment.emit();
        }
      }
    });
  }
}
