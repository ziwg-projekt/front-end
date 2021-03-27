import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {RegistrationFormModule} from './modules/registration-form/registration-form.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RegistrationFormModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiYXBhcnRpbW8iLCJhIjoiY2s3czExeTZqMGo2NDNncXRrbjJhMHRibiJ9.jb6USHO9LXmQZoXXwNHuiw', // Optional, can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken: 'pk.eyJ1IjoiYXBhcnRpbW8iLCJhIjoiY2s3czExeTZqMGo2NDNncXRrbjJhMHRibiJ9.jb6USHO9LXmQZoXXwNHuiw' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
