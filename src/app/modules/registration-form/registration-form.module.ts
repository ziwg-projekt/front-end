import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationFormComponent} from './registration-form.component';
import {RegistrationFormRoutingModule} from './registration-form-routing/registration-form-routing.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {SharedModule} from '../../shared/shared.module';
import {FormPersonalDataComponent} from './pages/form-personal-data/form-personal-data.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormMainPageComponent} from './pages/form-main-page/form-main-page.component';
import {ChartsModule} from 'ng2-charts';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { FormMapStageComponent } from './pages/form-map-stage/form-map-stage.component';
import { MapComponent } from './components/map/map.component';
import { AuthenticationCodeDialogComponent } from './components/authentication-code-dialog/authentication-code-dialog.component';
import { RegistrationInfoDialogComponent } from './components/registration-info-dialog/registration-info-dialog.component';
import { RegistrationDataDialogComponent } from './components/registration-data-dialog/registration-data-dialog.component';



@NgModule({
  declarations: [RegistrationFormComponent, FormMainPageComponent, FormPersonalDataComponent, LineChartComponent,
    FormMapStageComponent, MapComponent, AuthenticationCodeDialogComponent, RegistrationInfoDialogComponent, RegistrationDataDialogComponent],
  imports: [
    CommonModule,
    RegistrationFormRoutingModule,
    FlexModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    FlexLayoutModule
  ],
    exports: [
        RegistrationFormComponent,
        MapComponent
    ]
})
export class RegistrationFormModule { }
