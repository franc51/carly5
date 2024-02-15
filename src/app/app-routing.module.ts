import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterVehicleComponent } from './containers/register-vehicle/register-vehicle.component';

const routes: Routes = [
  {path: 'register-vehicle', component: RegisterVehicleComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
