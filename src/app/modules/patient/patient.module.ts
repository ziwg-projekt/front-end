import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { FlexModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing/patient-routing.module';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import {RegistrationFormModule} from '../registration-form/registration-form.module';
import {PortalModule} from '../portal/portal.module';
import { PatientConfirmComponent } from './patient-confirm/patient-confirm.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';

@NgModule({
  imports: [
    CommonModule,
    FlexModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PatientRoutingModule,
    RegistrationFormModule,
    PortalModule
  ],
  declarations: [PatientComponent, PatientDashboardComponent, PatientConfirmComponent, PatientInfoComponent]
})
export class PatientModule { }
