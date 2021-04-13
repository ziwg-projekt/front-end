import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { CitizenStateType } from 'src/app/core/enums/citizen-state.enum';
import { Citizen } from 'src/app/core/models/citizen';
import { CitizensService } from 'src/app/core/services/citizens.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit, OnDestroy {
  personalId: FormControl = new FormControl(undefined, [
    Validators.required,
    Validators.pattern(/^[0-9]\d*$/),
  ]);
  citizenForm: FormGroup;
  subscriptions: Subscription[] = [];
  appointments$: Observable<any>;
  constructor(
    private citizensService: CitizensService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

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
        this.citizensService.getPatient(this.personalId.value).subscribe(
          (c) => {
            this.patchValueOfCitizen(c);
            this.appointments$ = this.citizensService.getPatientAppointments(
              this.personalId.value
            );
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
      state: [CitizenStateType.Waiting],
    });
  }
  patchValueOfCitizen(citizen: Citizen) {
    this.citizenForm.patchValue(citizen);
  }

  resetForms() {
    this.citizenForm.reset();
    this.personalId.setValue(null);
  }
}
