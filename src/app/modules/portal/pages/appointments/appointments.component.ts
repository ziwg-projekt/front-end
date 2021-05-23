import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AppointmentState } from 'src/app/core/enums/appointment-state.enum';
import { Appointment } from 'src/app/core/models/appointment';
import { Hospital } from 'src/app/core/models/hospital';
import { AuthService } from 'src/app/core/services/auth.service';
import { PortalService } from 'src/app/core/services/portal.service';
import { NewAppointmentDialogComponent } from '../../components/new-appointment-dialog/new-appointment-dialog.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  hospital: Hospital;
  subscriptions: Subscription[] = [];
  appointments$: Observable<any>;
  chosenRadioButton: AppointmentState = AppointmentState.Available;
  appointmentState = AppointmentState;
  constructor(
    private portalService: PortalService,
    public dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.portalService.getUser(this.authService.userId).subscribe((u) => {
        this.hospital = u.hospital;
        this.getAppointments();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  openAppointmentDialog(appointment: Appointment) {
    const dialogRef = this.dialog.open(NewAppointmentDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        hospitalId: this.hospital.id,
        appointment: appointment,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data.citizen) {
        let appointmentToUpdate:Appointment;
        appointmentToUpdate = Object.assign({},appointment)
        appointmentToUpdate.citizen = data.citizen;
        this.subscriptions.push(
          this.portalService
            .addCitizenToAppointmentHospital(appointmentToUpdate)
            .subscribe((a) => {
              this.getAppointments();
              this.toastrService.success(
                'Pomyślnie przypisano pacjenta do szczepienia'
              );
            })
        );
      }
    });
  }
  getAppointments(
    available: boolean = false,
    made: boolean = false,
    assigned: boolean = false
  ) {
    switch (this.chosenRadioButton) {
      case AppointmentState.Available:
        available = true;
        break;
      case AppointmentState.Made:
        made = true;
        break;
      case AppointmentState.Assigned:
        assigned = true;
        break;
    }
    this.appointments$ = this.portalService.getHospitalAppointments(
      available,
      made,
      assigned
    );
  }
  doneAppointment(a: Appointment) {
    this.portalService.madeAppointment(a).subscribe((a) => {
      this.getAppointments();
      this.toastrService.success('Pomyślnie zmieniono status szczepienia');
    });
  }

  cancelAppointment(a: Appointment) {
    this.portalService.notMadeAppointment(a).subscribe((a) => {
      this.getAppointments();
      this.toastrService.success(
        'Pomyślnie odwołono szczepienie dla danego pacjenta'
      );
    });
  }
}
