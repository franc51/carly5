import { Injectable, ViewEncapsulation } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicles: VehicleRegistration[] = [
    {
      id: 'B02JF33',
      date: '24.03.2024',
      ownerName: 'ownerName',
      ownerSurname: 'apdfihagoisn',
      ownerPhone: '0712312312',
      ownerEmail: 'string',
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
      details: 'Lipsa asigurare',
      status: 'În așteptare',
    },
    {
      id: 'AP20TJF',
      date: '24.03.2024',
      ownerName: 'ownerName',
      ownerSurname: 'apdfihagoisn',
      ownerPhone: '0712312312',
      ownerEmail: 'string',
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
      details: 'Lipsa asigurare',
      status: 'În așteptare',
    },
    {
      id: 'AP29VJ4',
      date: '12.01.2022',
      ownerName: 'ownerName',
      ownerSurname: 'apdfihagoisn',
      ownerPhone: '0712312312',
      ownerEmail: 'string',
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
      details: 'Lipsa asigurare',
      status: 'În așteptare',
    },
  ];

  constructor() {}

  read() {
    return this.vehicles;
  }
  readOne(id: string) {
    const vehicle = this.read().find(
      (vehicle: VehicleRegistration) => vehicle.id === id
    );
    if (vehicle) {
      return vehicle;
    }
    return {
      id: '',
      date: '',
      ownerName: '',
      ownerSurname: '',
      ownerPhone: '',
      ownerEmail: '',
      vehicleManufacturer: '',
      vehicleModel: '',
      vehicleVinNumber: '',
      vehicleNumberPlate: '',
    };
  }

  giveBirth(payload: VehicleRegistration) {
    this.vehicles = [...this.vehicles, payload];
    console.log(this.vehicles);
  }
}
