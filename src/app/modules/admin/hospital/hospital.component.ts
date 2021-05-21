import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PortalService } from 'src/app/core/services/portal.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
})
export class HospitalComponent implements OnInit {
  hospitalFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastrSerice: ToastrService,
    private portalService: PortalService
  ) {}

  ngOnInit() {
    this.hospitalFormGroup = this.fb.group({
      city: [null, Validators.required],
      name: [null, Validators.required],
      password: [null, Validators.required],
      street: [null, Validators.required],
      street_number: [null, Validators.required],
      username: [null, Validators.required],
    });
  }

  submit() {
    if (this.hospitalFormGroup.valid) {
      this.portalService
        .addHospital(this.hospitalFormGroup.value)
        .subscribe((h) => {
          this.toastrSerice.success('Pomyslnie dodano szpital');
          this.hospitalFormGroup.reset();
        });
    } else {
      this.hospitalFormGroup.markAllAsTouched();
      this.toastrSerice.warning('Proszę wypełnić wymagane pola');
    }
  }
}
