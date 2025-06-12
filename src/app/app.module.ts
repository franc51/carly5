import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FirebaseService } from './admin/services/firebase.service';

import {MatSnackBarModule} from '@angular/material/snack-bar'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDateFormats, NativeDateAdapter } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthModule } from '@auth0/auth0-angular';
import { HomepageComponent } from './containers/homepage/homepage.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';

import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabGroup } from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NumberplateCheckComponent } from './containers/numberplate-check/numberplate-check.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInput } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import {MatDialogModule} from '@angular/material/dialog';

// form
import { MatAccordion } from '@angular/material/expansion';
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
import { RegistrationsComponent } from './containers/registrations/registrations.component';
import { DatepipeComponent } from './components/datepipe/datepipe.component';
import { AdminContainerComponent } from './admin/admin-container/admin-container.component';
import { AdminHistoryComponent } from './admin/admin-history/admin-history.component';
import {
  initializeApp as initializeApp_alias,
  provideFirebaseApp,
} from '@angular/fire/app';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { ReserveContainerComponent } from './containers/reserve-container/reserve-container.component';
import { RadiationsComponent } from './containers/radiations/radiations.component';
import { RadiationHistoryComponent } from './containers/radiation-history/radiation-history.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { DatePipe } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PaymentConfirmationComponent } from './payments/payment-confirmation/payment-confirmation.component';
import { DialogRadiationComponent } from './components/dialog-radiation/dialog-radiation.component';
import  emailjs  from "@emailjs/browser"; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter, MatNativeDateModule } from '@angular/material/core';
import { Pipe, PipeTransform } from '@angular/core';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    OrderByDatePipe,
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
    RegistrationsComponent,
    DatepipeComponent,
    AdminContainerComponent,
    AdminHistoryComponent,
    ReserveContainerComponent,
    RadiationsComponent,
    RadiationHistoryComponent,
    ImageGalleryComponent,
    UserProfileComponent,
    PaymentConfirmationComponent,
    DialogRadiationComponent,
  ],
  imports: [
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    UcWidgetModule,
    MatAccordion,
    MatDialogClose,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatTabGroup,
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
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'carly-58c95',
        appId: '1:811853117687:web:11594b1523e42a962a3bf2',
        databaseURL: 'https://vehicles-9f2ad.firebaseio.com',
        storageBucket: 'carly-58c95.appspot.com',
        apiKey: 'AIzaSyDraEcH4AENNMX0jP5tnGW4MlkhUApXFrY',
        authDomain: 'carly-58c95.firebaseapp.com',
        messagingSenderId: '811853117687',
        measurementId: 'G-F8934N76TW',
      })
    ),
    provideFunctions(() => getFunctions()),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'input',
        },
        display: {
          dateInput: 'input',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
        DatePipe,
      } as MatDateFormats,
    },
    { provide: NativeDateAdapter, useValue: provideNativeDateAdapter() }, // Here is where provideNativeDateAdapter is used

    provideAnimationsAsync(),
    FirebaseService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig = {
    apiKey: 'AIzaSyDraEcH4AENNMX0jP5tnGW4MlkhUApXFrY',
    authDomain: 'carly-58c95.firebaseapp.com',
    projectId: 'carly-58c95',
    storageBucket: 'carly-58c95.appspot.com',
    messagingSenderId: '811853117687',
    appId: '1:811853117687:web:11594b1523e42a962a3bf2',
    measurementId: 'G-F8934N76TW',
  };

  // Initialize Firebase
  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);
}
