import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterVehicleComponent } from './containers/register-vehicle/register-vehicle.component';
import { ReserveNumberplateComponent } from './containers/reserve-numberplate/reserve-numberplate.component';

const routes: Routes = [
  {path: 'profile', component: RegisterVehicleComponent},
  {path: 'register-vehicle', component: ReserveNumberplateComponent},
  {path: 'radiate-vehicle', component: ReserveNumberplateComponent},
  {path: 'technical-appointment', component: ReserveNumberplateComponent},
  {path: 'reserve-numberplate', component: ReserveNumberplateComponent},
  {path: 'taxes', component: ReserveNumberplateComponent},
  {path: 'contact', component: ReserveNumberplateComponent},
  {path: 'help', component: ReserveNumberplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
