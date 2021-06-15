import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PortalService } from 'src/app/core/services/portal.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  companyFormGroup: FormGroup;
  constructor(
    private portalService: PortalService,
    private toastrService: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.companyFormGroup = this.fb.group({
      logo_path: [null, Validators.required],
      name: [null, Validators.required],
    });
  }

  submit() {
    if (this.companyFormGroup.valid) {
      this.portalService
        .addCompany(this.companyFormGroup.value)
        .subscribe((h) => {
          this.toastrService.success('Pomyslnie dodano firmę');
          this.companyFormGroup.reset();
        });
    } else {
      this.companyFormGroup.markAllAsTouched();
      this.toastrService.warning('Proszę wypełnić wymagane pola');
    }
  }
}
