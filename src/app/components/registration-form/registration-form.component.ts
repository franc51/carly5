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
        id: '2gh2gj',
        ownerName: 'ownerName',
        ownerCNP: 12324,
        ownerIdentityCard: 'ownerIdentityCard',
        vehicleManufacturer: 'Mercedes',
        vehicleModel: 'AMG',
        vehicleYear: 2003,
        vehicleVinNumber: 'WVW527HF7FF320A',
        vehicleIdentityCard: 'vehicleIdentityCard',
        vehicleNumberPlate: 'MM47GHK',
        certificatePaymentProof: true,
        ownershipProof: 'ownershipProof',
        status: 'În așteptare',
      },
      {
        id: 'n90f68d',
        ownerName: 'ownerName',
        ownerCNP: 12324,
        ownerIdentityCard: 'ownerIdentityCard',
        vehicleManufacturer: 'Opel',
        vehicleModel: 'Astra',
        vehicleYear: 2003,
        vehicleVinNumber: 'WVW527HF7FF320A',
        vehicleIdentityCard: 'vehicleIdentityCard',
        vehicleNumberPlate: 'SB32DRJ',
        certificatePaymentProof: true,
        ownershipProof: 'ownershipProof',
        status: 'Respins',
      },
      {
        id: 's4pg9ub',
        ownerName: 'ownerName',
        ownerCNP: 12324,
        ownerIdentityCard: 'ownerIdentityCard',
        vehicleManufacturer: 'Mercedes',
        vehicleModel: 'Vito',
        vehicleYear: 2003,
        vehicleVinNumber: 'WVW527HF7FF320A',
        vehicleIdentityCard: 'vehicleIdentityCard',
        vehicleNumberPlate: 'IL25HDF',
        certificatePaymentProof: true,
        ownershipProof: 'ownershipProof',
        status: 'Acceptat',
      },
      {
        id: '0g5sd7',
        ownerName: 'ownerName',
        ownerCNP: 12324,
        ownerIdentityCard: 'ownerIdentityCard',
        vehicleManufacturer: 'Volkswagen',
        vehicleModel: 'Arteon',
        vehicleYear: 2003,
        vehicleVinNumber: 'WVW527HF7FF320A',
        vehicleIdentityCard: 'vehicleIdentityCard',
        vehicleNumberPlate: 'BV10GSF',
        certificatePaymentProof: true,
        ownershipProof: 'ownershipProof',
        status: 'Acceptat',
      },
    ];
  }

  trackById(index: number, value: VehicleRegistration) {
    return value.id;
  }
}
