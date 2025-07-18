import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReserveNumberplateComponent } from './containers/reserve-numberplate/reserve-numberplate.component';
import { RadiateVehicleComponent } from './containers/radiate-vehicle/radiate-vehicle.component';
import { TechnicalAppointmentComponent } from './containers/technical-appointment/technical-appointment.component';
import { TaxesComponent } from './containers/taxes/taxes.component';
import { ContactComponent } from './containers/contact/contact.component';
import { HelpComponent } from './containers/help/help.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { RegistrationsComponent } from './containers/registrations/registrations.component';
import { ReserveContainerComponent } from './containers/reserve-container/reserve-container.component';
import { RadiationsComponent } from './containers/radiations/radiations.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PaymentConfirmationComponent } from './payments/payment-confirmation/payment-confirmation.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { AboutMeComponent } from './components/about-me/about-me.component';

const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'register-vehicle', component: RegistrationsComponent },
  { path: 'radiate-vehicle', component: RadiationsComponent },
  { path: 'technical-appointment', component: TechnicalAppointmentComponent },
  { path: 'reserve-container', component: ReserveContainerComponent },
  { path: 'taxes', component: TaxesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'help', component: HelpComponent },
  { path: 'admin/image-gallery', component: ImageGalleryComponent, pathMatch: 'full' },
  { path: 'payment-confirmation', component: PaymentConfirmationComponent},
  { path: 'about-me', component: AboutMeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
