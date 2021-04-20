import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/core/models/doctor';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vaccine } from 'src/app/core/models/vaccine';
import { PortalService } from 'src/app/core/services/portal.service';
@Component({
  selector: 'app-new-appointment-dialog',
  templateUrl: './new-appointment-dialog.component.html',
  styleUrls: ['./new-appointment-dialog.component.scss'],
})
export class NewAppointmentDialogComponent implements OnInit {
  appointmentForm: FormGroup;
  doctors$: Observable<Doctor[]> = this.portalService.getDoctors(
    this.data.hospitalId
  );
  vaccines$: Observable<Vaccine[]> = this.portalService.getHospitalVaccines(
    this.data.hospitalId
  );
  minDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<NewAppointmentDialogComponent>,
    private portalService: PortalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.appointmentForm = this.fb.group({
      date: [undefined, Validators.required],
      doctor: [undefined, Validators.required],
      vaccine: [undefined, Validators.required],
      citizen: [this.data.citizen],
    });
    if (this.data.appointment) {
      this.appointmentForm.patchValue(this.data.appointment);
    }
  }

  get getCitizenFullName() {
    return this.data.citizen.name + ' ' + this.data.citizen.surname;
  }

  addAppointment() {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    }
  }
}
