import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthModule } from '@auth0/auth0-angular';
import { HomepageComponent } from './containers/homepage/homepage.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// styles
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NumberplateCheckComponent } from './containers/numberplate-check/numberplate-check.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

// form
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { ReserveNumberplateComponent } from './containers/reserve-numberplate/reserve-numberplate.component';
import { TaxesComponent } from './containers/taxes/taxes.component';
import { RadiateVehicleComponent } from './containers/radiate-vehicle/radiate-vehicle.component';
import { TechnicalAppointmentComponent } from './containers/technical-appointment/technical-appointment.component';
import { ContactComponent } from './containers/contact/contact.component';
import { HelpComponent } from './containers/help/help.component';
import { RegistrationHistoryComponent } from './components/registration-history/registration-history.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    NumberplateCheckComponent,
    DashboardComponent,
    ProfileComponent,
    ReserveNumberplateComponent,
    TaxesComponent,
    RadiateVehicleComponent,
    TechnicalAppointmentComponent,
    ContactComponent,
    HelpComponent,
    RegistrationHistoryComponent,
    RegistrationFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInput,
    MatInputModule,
    MatTableModule,
    AuthModule.forRoot({
      domain: 'dev-tlh80f7xwrzzr2oq.us.auth0.com',
      clientId: 'cn8K5prNUAiMqawEhmdTrjXu9RGGwxJL',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
