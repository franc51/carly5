import { Component } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { MatSelect } from '@angular/material/select';
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
        id: 'B02JF33',
        date: '24.03.2024',
        ownerName: 'ownerName',
        ownerPhone: '0712312312',
        ownerCNP: 12324,
        ownerIdentityCard: 'ownerIdentityCard',
        vehicleManufacturer: 'KIA',
        vehicleModel: 'CEED',
        vehicleYear: 2003,
        vehicleVinNumber: 'WVW527HF7FF320A',
        vehicleIdentityCard: 'vehicleIdentityCard',
        vehicleNumberPlate: 'MM47GHK',
        certificatePaymentProof: true,
        ownershipProof: 'ownershipProof',
        details: 'string',

        status: 'Respins',
      },
      {
        id: 'AP20TJF',
        date: '24.03.2024',
        ownerName: 'ownerName',
        ownerPhone: '0712312312',
        ownerCNP: 12324,
        ownerIdentityCard: 'ownerIdentityCard',
        vehicleManufacturer: 'MERCEDES',
        vehicleModel: 'AMG',
        vehicleYear: 2003,
        vehicleVinNumber: 'WVW527HF7FF320A',
        vehicleIdentityCard: 'vehicleIdentityCard',
        vehicleNumberPlate: 'MM47GHK',
        certificatePaymentProof: true,
        ownershipProof: 'ownershipProof',
        details: 'string',

        status: 'Aprobat',
      },
      {
        id: 'AP29VJ4',
        date: '12.01.2022',
        ownerName: 'ownerName',
        ownerPhone: '0712312312',
        ownerCNP: 12324,
        ownerIdentityCard: 'ownerIdentityCard',
        vehicleManufacturer: 'VOLKSWAGEN',
        vehicleModel: 'ARTEON',
        vehicleYear: 2003,
        vehicleVinNumber: 'WVW527HF7FF320A',
        vehicleIdentityCard: 'vehicleIdentityCard',
        vehicleNumberPlate: 'MM47GHK',
        certificatePaymentProof: true,
        ownershipProof: 'ownershipProof',
        details: 'string',
        status: 'Aprobat',
      },
    ];
  }

  trackById(index: number, value: VehicleRegistration) {
    return value.id;
  }
  displayedColumns: string[] = [
    'id',
    'vehicleManufacturer',
    'vehicleModel',
    'date',
    'status',
  ];
  dataSource = this.vehicle;
}
