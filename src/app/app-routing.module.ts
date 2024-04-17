import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReserveNumberplateComponent } from './containers/reserve-numberplate/reserve-numberplate.component';
import { RadiateVehicleComponent } from './containers/radiate-vehicle/radiate-vehicle.component';
import { TechnicalAppointmentComponent } from './containers/technical-appointment/technical-appointment.component';
import { TaxesComponent } from './containers/taxes/taxes.component';
import { ContactComponent } from './containers/contact/contact.component';
import { HelpComponent } from './containers/help/help.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { RegistrationsComponent } from './containers/registrations/registrations.component';
import { ReserveContainerComponent } from './containers/reserve-container/reserve-container.component';
import { RadiationsComponent } from './containers/radiations/radiations.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';

const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register-vehicle', component: RegistrationsComponent },
  { path: 'radiate-vehicle', component: RadiationsComponent },
  { path: 'technical-appointment', component: TechnicalAppointmentComponent },
  { path: 'reserve-container', component: ReserveContainerComponent },
  { path: 'taxes', component: TaxesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'help', component: HelpComponent },
  { path: 'admin/image-gallery', component: ImageGalleryComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
