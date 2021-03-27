import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationFormComponent} from './registration-form.component';
import {RegistrationFormRoutingModule} from './registration-form-routing/registration-form-routing.module';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {SharedModule} from '../../shared/shared.module';
import {FormPersonalDataComponent} from './pages/form-personal-data/form-personal-data.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormMainPageComponent} from './pages/form-main-page/form-main-page.component';


@NgModule({
  declarations: [RegistrationFormComponent, FormMainPageComponent, FormPersonalDataComponent],
  imports: [
    CommonModule,
    RegistrationFormRoutingModule,
    FlexModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RegistrationFormComponent
  ]
})
export class RegistrationFormModule {
}
