import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReserveNumberplateComponent } from './containers/reserve-numberplate/reserve-numberplate.component';
import { RadiateVehicleComponent } from './containers/radiate-vehicle/radiate-vehicle.component';
import { TechnicalAppointmentComponent } from './containers/technical-appointment/technical-appointment.component';
import { TaxesComponent } from './containers/taxes/taxes.component';
import { ContactComponent } from './containers/contact/contact.component';
import { HelpComponent } from './containers/help/help.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ProfileComponent } from './containers/profile/profile.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'register-vehicle', component: RegistrationFormComponent },
  { path: 'radiate-vehicle', component: RadiateVehicleComponent },
  { path: 'technical-appointment', component: TechnicalAppointmentComponent },
  { path: 'reserve-numberplate', component: ReserveNumberplateComponent },
  { path: 'taxes', component: TaxesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'help', component: HelpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
