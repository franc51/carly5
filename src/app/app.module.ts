import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthModule } from '@auth0/auth0-angular';
import { HomepageComponent } from './containers/homepage/homepage.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
// styles

import * as LR from "@uploadcare/blocks";

LR.registerBlocks(LR);


import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginator} from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NumberplateCheckComponent } from './containers/numberplate-check/numberplate-check.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInput } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {
  MatOption,
  MatSelect,
  MatSelectModule,
} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

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
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UploadcareComponent } from './components/uploadcare/uploadcare.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SimplepaginatorComponent } from './components/simplepaginator/simplepaginator.component';

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
    AdminDashboardComponent,
    UploadcareComponent,
    PaginatorComponent,
    SimplepaginatorComponent,
  ],
  imports: [
    HttpClientModule,
    MatSortModule,
    MatSort,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatPaginator,
    MatPaginatorModule,
    UcWidgetModule,
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
    MatSelect,
    MatOption,
    MatTooltipModule,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
