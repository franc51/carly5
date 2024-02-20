import { Component } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent {
  vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];

  ngOnInit(): void {
    this.vehicles = [
      {
        ownerName: 'ownerName',
        ownerCNP: 12324,
        ownerIdentityCard: 'ownerIdentityCard',
        vehicleManufacturer: 'Volkswagen',
        vehicleModel: 'Passat',
        vehicleYear: 2003,
        vehicleVinNumber: 'WVW527HF7FF320A',
        vehicleIdentityCard: 'vehicleIdentityCard',
        vehicleNumberPlate: 'BV51FXR',
        certificatePaymentProof: true,
        ownershipProof: 'ownershipProof',
        status: 'Respins',
      },
    ];
    this.vehicle = this.vehicles[0];
  }
}
