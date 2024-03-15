import { Component, Input, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { VehicleService } from '../../admin/services/vehicle.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.css',
})
export class RegistrationsComponent implements OnInit {
  vehicle: VehicleRegistration = {
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
    details: 'Lipsă asigurare',
    status: 'Respins',
    count: 0,
    items: undefined,
    total_count: 0,
  };
  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    // this.vehicle = this.vehicleService.readOne('B02JF33');
  }
  onCreate(vehicle: VehicleRegistration) {
    this.vehicleService.giveBirth(vehicle);
  }
  onUpdate(vehicle: VehicleRegistration) {
    this.vehicleService.update(vehicle);
  }
}
