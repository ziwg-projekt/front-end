import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { FlexModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing/patient-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlexModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PatientRoutingModule
  ],
  declarations: [PatientComponent]
})
export class PatientModule { }
