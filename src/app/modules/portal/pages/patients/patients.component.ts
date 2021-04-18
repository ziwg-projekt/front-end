import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppointmentState } from 'src/app/core/enums/appointment-state.enum';
import { CitizenStateType } from 'src/app/core/enums/citizen-state.enum';
import { Appointment } from 'src/app/core/models/appointment';
import { Citizen } from 'src/app/core/models/citizen';
import { Hospital } from 'src/app/core/models/hospital';
import { PortalService } from 'src/app/core/services/portal.service';
import { NewAppointmentDialogComponent } from '../appointments/new-appointment-dialog/new-appointment-dialog.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit, OnDestroy {
  personalId: FormControl = new FormControl(2888924742, [
    Validators.required,
    Validators.pattern(/^[0-9]\d*$/),
  ]);
  citizenForm: FormGroup;
  subscriptions: Subscription[] = [];
  appointments$: Observable<Appointment[]>;
  enableForm: boolean = false;
  hospital: Hospital;
  currentCitizen: Citizen;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private portalService: PortalService,
    public dialog: MatDialog
  ) {
    this.subscriptions.push(
      this.portalService.getUser(110).subscribe((u) => {
        this.hospital = u.hospital;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngOnInit() {
    this.initForm();
  }

  searchPatient() {
    if (this.personalId.valid && this.personalId.value != '') {
      console.log(this.personalId.valid);
      this.subscriptions.push(
        this.portalService.getPatient(this.personalId.value).subscribe(
          //2888924742
          (c) => {
            this.patchValueOfCitizen(c);
            this.currentCitizen = c;
            this.enableForm = true;
            this.getAppointments();
          },
          (error) => {
            this.toastr.warning(
              `Nie ma takiego pacjenta z numerem PESEL ${this.personalId.value}`
            );
          }
        )
      );
    }
  }

  initForm() {
    this.citizenForm = this.fb.group({
      address: [undefined],
      email: [undefined],
      hospital: [undefined],
      name: [undefined],
      surname: [undefined],
      pesel: [undefined],
      phone_number: [undefined],
      city: [undefined],
      street: [undefined],
      street_number: [undefined],
      state: [CitizenStateType.Waiting],
    });
  }

  submitForm() {
    if (!this.personalId.value) {
      console.log('dodaj nowego');
    } else {
      console.log('zmiana');
    }
  }

  patchValueOfCitizen(citizen: Citizen) {
    this.citizenForm.patchValue(citizen);
    this.citizenForm.get('city').setValue(citizen.address.city);
    this.citizenForm.get('street').setValue(citizen.address.street);
    this.citizenForm
      .get('street_number')
      .setValue(citizen.address.street_number);
  }

  newUserToggle() {
    if ((this.enableForm && this.personalId.enabled) || !this.enableForm) {
      this.enableForm = true;
      this.personalId.disable();
    } else if (this.enableForm && !this.personalId.enabled) {
      this.enableForm = false;
      this.personalId.enable();
    }
    this.resetValues();
  }

  resetSearch() {
    if (this.personalId.enabled) {
      this.resetValues();
      this.enableForm = false;
    }
  }

  resetValues() {
    this.personalId.reset();
    this.citizenForm.reset();
    this.appointments$ = null;
  }

  getAppointments(a?: Appointment) {
    this.appointments$ = this.portalService
      .getPatientAppointments(this.personalId.value)
      .pipe(
        map((array) => {
          if (a) {
            array.push(a);
          }
          return array;
        })
      );
  }
  openNewAppointmentDialog() {
    const dialogRef = this.dialog.open(NewAppointmentDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        hospitalId: this.hospital.id,
        citizen: this.currentCitizen,
      },
    });

    dialogRef.afterClosed().subscribe((data: Appointment) => {
      if (data && data.citizen) {
        data.date = new Date(data.date);
        data.state = AppointmentState.Confirmed;
        //  this.portalService.addAppointment(data).subscribe(a=>{
        this.getAppointments(data);
        // })
      }
    });
  }

  openAppointmentDialog(a:Appointment){
    const dialogRef = this.dialog.open(NewAppointmentDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        hospitalId: this.hospital.id,
        citizen: this.currentCitizen,
        appointment:a
      },
    });
    dialogRef.afterClosed().subscribe((data: Appointment) => {
    //  if (data && data.appointment) {
       // data.date = new Date(data.date);
       // data.state = AppointmentState.Cancelled;
        //  this.portalService.addAppointment(data).subscribe(a=>{
       // this.getAppointments(data);
        // })
     // }
    });
  }
}
