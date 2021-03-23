import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form.component';
import {RegistrationFormRoutingModule} from './registration-form-routing/registration-form-routing.module';
import { FormSidebarComponent } from './components/form-sidebar/form-sidebar.component';
import { FormMainPageComponent } from './components/form-main-page/form-main-page.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';



@NgModule({
  declarations: [RegistrationFormComponent, FormSidebarComponent, FormMainPageComponent],
  imports: [
    CommonModule,
    RegistrationFormRoutingModule,
    FlexModule,
    MaterialModule
  ],
  exports: [
    RegistrationFormComponent
  ]
})
export class RegistrationFormModule { }
