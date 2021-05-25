import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/core/models/hospital';
import { AuthService } from 'src/app/core/services/auth.service';
import { PortalService } from 'src/app/core/services/portal.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  hospital: Hospital;
  doctorsAmount: FormControl = new FormControl(undefined);
  constructor(
    private portalService: PortalService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.portalService.getUser(this.authService.userId).subscribe((h) => {
        this.hospital = h.hospital;
        this.portalService.getDoctors(this.hospital.id).subscribe((d) => {
          this.doctorsAmount.setValue(d.length);
        });
      })
    );
  }
  changeAmountOfDoctors() {
    if (this.doctorsAmount.valid) {
      this.subscriptions.push(
        this.portalService.changeDoctorsAmount().subscribe((d) => {
          this.doctorsAmount.setValue(d.id);
          this.toastrService.success('Dodano lekarza do kadry');
        })
      );
    } else {
      this.doctorsAmount.markAllAsTouched();
      this.toastrService.warning('Podano niepoprawną ilość lekarzy');
    }
  }
}
