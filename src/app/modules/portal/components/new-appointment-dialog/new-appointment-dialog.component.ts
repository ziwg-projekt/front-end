import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vaccine } from 'src/app/core/models/vaccine';
import { PortalService } from 'src/app/core/services/portal.service';
import { Citizen } from 'src/app/core/models/citizen';
@Component({
  selector: 'app-new-appointment-dialog',
  templateUrl: './new-appointment-dialog.component.html',
  styleUrls: ['./new-appointment-dialog.component.scss'],
})
export class NewAppointmentDialogComponent implements OnInit {
  appointmentForm: FormGroup;
  vaccines$: Observable<Vaccine[]> = this.portalService.getHospitalVaccines(
    this.data.hospitalId
  );
  citizens$ = this.portalService.getPatients();
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
      date: [undefined],
      vaccine: [undefined],
      citizen: [undefined, Validators.required],
    });
    if (this.data.appointment) {
      this.appointmentForm.patchValue(this.data.appointment);
    }
  }

  get getCitizenFullName() {
    return this.appointmentForm.get("citizen").value.name + ' ' + this.appointmentForm.get("citizen").value.surname;
  }

  get getVaccine() {
    return this.appointmentForm.get("vaccine").value.company.name + " - " + this.appointmentForm.get("vaccine").value.code;
  }

  addAppointment() {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    }
  }
}
