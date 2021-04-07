import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PortalComponent } from './portal.component';
import { VaccinesComponent } from './pages/vaccines/vaccines.component';
import { PortalRoutingModule } from './portal-routing/portal-routing.module';
import { PatientsComponent } from './pages/patients/patients.component';

@NgModule({
  declarations: [PortalComponent, VaccinesComponent, PatientsComponent],
  imports: [
    CommonModule,
    FlexModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PortalRoutingModule,
  ],
  exports: [PortalComponent],
})
export class PortalModule {}
