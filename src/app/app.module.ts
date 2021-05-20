import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PortalModule } from './modules/portal/portal.module';
import { RegistrationFormModule } from './modules/registration-form/registration-form.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './core/guards/auth.guard';
import { PatientModule } from './modules/patient/patient.module';
import { AdminModule } from './modules/admin/admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    RegistrationFormModule,
    PortalModule,
    ToastrModule.forRoot(),
    PatientModule,
    AdminModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
