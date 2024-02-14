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

// form
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { RegisterVehicleComponent } from './containers/register-vehicle/register-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    NumberplateCheckComponent,
    DashboardComponent,
    ProfileComponent,
    RegisterVehicleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatExpansionModule,
    MatSidenavModule,
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
