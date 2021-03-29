import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form.component';
import {RegistrationFormRoutingModule} from './registration-form-routing/registration-form-routing.module';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { FormMainPageComponent } from './pages/form-main-page/form-main-page.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {SharedModule} from '../../shared/shared.module';
import { FormPersonalDataComponent } from './pages/form-personal-data/form-personal-data.component';
import {FormsModule} from '@angular/forms';
import { FormMapStageComponent } from './pages/form-map-stage/form-map-stage.component';
import { MapComponent } from './components/map/map.component';



@NgModule({
  declarations: [RegistrationFormComponent, FormMainPageComponent, FormPersonalDataComponent, FormMapStageComponent, MapComponent],
  imports: [
    CommonModule,
    RegistrationFormRoutingModule,
    FlexModule,
    MaterialModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    RegistrationFormComponent
  ]
})
export class RegistrationFormModule { }
