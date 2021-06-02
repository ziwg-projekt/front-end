import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FlexModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { HospitalComponent } from './hospital/hospital.component';
import { CompaniesComponent } from './companies/companies.component';
@NgModule({
  imports: [
    CommonModule,
    FlexModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  declarations: [AdminComponent, HospitalComponent, CompaniesComponent],
})
export class AdminModule {}
