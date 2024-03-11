import { Component } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.css',
})
export class RegistrationsComponent {
  vehicle!: VehicleRegistration;
  onCreate(vehicle: VehicleRegistration) {
    console.log('Oncreate: ', vehicle);
  }
}
