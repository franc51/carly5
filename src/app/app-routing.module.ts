import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterVehicleComponent } from './containers/register-vehicle/register-vehicle.component';
import { ReserveNumberplateComponent } from './containers/reserve-numberplate/reserve-numberplate.component';

const routes: Routes = [
  {path: 'register-vehicle', component: RegisterVehicleComponent},
  {path: 'reserve-numberplate', component: ReserveNumberplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
