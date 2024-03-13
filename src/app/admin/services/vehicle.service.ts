import { Injectable } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicles: VehicleRegistration[] = [];

  constructor(private http: HttpClient) {}

  read() {
    return this.http.get<VehicleRegistration[]>(`/api/vehicles`);
    // return this.vehicles;
  }

  // readOne(id: string) {
  //   const vehicle = this.read().find(
  //     (vehicle: VehicleRegistration) => vehicle.id === id
  //   );
  //   if (vehicle) {
  //     return vehicle;
  //   }
  //   return {
  //     id: '',
  //     date: '',
  //     ownerName: '',
  //     ownerSurname: '',
  //     ownerPhone: '',
  //     ownerEmail: '',
  //     ownerCNP: '',
  //     ownerIdentityCard: '',
  //     vehicleManufacturer: '',
  //     vehicleModel: '',
  //     vehicleYear: '',
  //     vehicleVinNumber: '',
  //     vehicleIdentityCard: '',
  //     vehicleNumberPlate: '',
  //     certificatePaymentProof: true,
  //     ownershipProof: '',
  //     details: 'Cerere trimisă',
  //     status: 'În așteptare',
  //   } as VehicleRegistration;
  // }

  giveBirth(payload: VehicleRegistration) {
    this.vehicles = [...this.vehicles, payload];
    console.log(this.vehicles);
  }
  update(payload: VehicleRegistration) {
    this.vehicles = this.vehicles.map((vehicle: VehicleRegistration) => {
      if (vehicle.id === payload.id) {
        console.log('returning payload');
        return payload;
      }
      console.log('returning vehicle');

      return vehicle;
    });
    console.log(this.vehicles);
  }
}
