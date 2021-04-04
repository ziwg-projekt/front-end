import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { VaccineStateEnum } from 'src/app/core/enums/vaccine-state.enum';
import { VaccinesService } from 'src/app/core/services/vaccines.service';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.scss'],
})
export class VaccinesComponent implements OnInit, OnDestroy {
  vaccineFormGroup: FormGroup;
  subscriptions: Subscription[];
  
  constructor(
    private fb: FormBuilder,
    private vaccinesService: VaccinesService
  ) {} //,private authService: AuthService;) {}
 
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngOnInit() {
    this.vaccineFormGroup = this.fb.group({
      code: [null, Validators.required],
      company: [null, Validators.required],
      hospital: [null], //this.authService.getHospital()],
      state: [VaccineStateEnum.Available],
      type: [null, Validators.required],
    });
  }

  addVaccine() {
    console.log(this.vaccineFormGroup.value);
    if (this.vaccineFormGroup.valid) {
    }
  }
}
