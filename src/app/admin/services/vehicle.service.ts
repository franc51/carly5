import { Injectable } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicles: VehicleRegistration[] = [
    {
      id: 'B02JF33',
      date: '24.03.2024',
      ownerName: 'Szasz',
      ownerSurname: 'Francisco',
      ownerPhone: '0720628821',
      ownerEmail: 'francisc.szasz@saguna.ro',
      ownerCNP: '2324',
      ownerIdentityCard: 'ownerIdentityCard',
      vehicleManufacturer: 'KIA',
      vehicleModel: 'CEED',
      vehicleYear: '2003',
      vehicleVinNumber: 'WVW527HF7FF320A',
      vehicleIdentityCard: 'vehicleIdentityCard',
      vehicleNumberPlate: 'MM47GHK',
      certificatePaymentProof: true,
      ownershipProof: 'ownershipProof',
      details: 'Cerere trimisă',
      status: 'În așteptare',
    },
    {
      id: 'PPPAAA',
      date: '24.03.2024',
      ownerName: 'Costica',
      ownerSurname: 'Camataru',
      ownerPhone: '0720628821',
      ownerEmail: 'francisc.szasz@saguna.ro',
      ownerCNP: '2324',
      ownerIdentityCard: 'ownerIdentityCard',
      vehicleManufacturer: 'MERCEDES-BENZ',
      vehicleModel: 'AMG63',
      vehicleYear: '2003',
      vehicleVinNumber: 'WVW527HF7FF320A',
      vehicleIdentityCard: 'vehicleIdentityCard',
      vehicleNumberPlate: 'BV66CMT',
      certificatePaymentProof: true,
      ownershipProof: 'ownershipProof',
      details: 'Cerere trimisă',
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
    )
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
      ownerCNP: '',
      ownerIdentityCard: '',
      vehicleManufacturer: '',
      vehicleModel: '',
      vehicleYear: '',
      vehicleVinNumber: '',
      vehicleIdentityCard: '',
      vehicleNumberPlate: '',
      certificatePaymentProof: true,
      ownershipProof: '',
      details: 'Cerere trimisă',
      status: 'În așteptare'
    } as VehicleRegistration;
  }

  giveBirth(payload: VehicleRegistration) {
    this.vehicles = [...this.vehicles, payload];
    console.log(this.vehicles);
  }
  update(payload: VehicleRegistration){
    this.vehicles = this.vehicles.map((vehicle: VehicleRegistration) => {
      if(vehicle.id === payload.id){
        console.log('returning payload');
        return payload;
      }
      console.log('returning vehicle');

      return vehicle;
    });
    console.log(this.vehicles);
  }
}
