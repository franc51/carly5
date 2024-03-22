import { Component, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { VehicleService } from '../../admin/services/vehicle.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css'],
})
export class RegistrationsComponent implements OnInit {
  vehicle: VehicleRegistration = {
    _id : '',
    date: new Date(),
    ownerName: 'string',
    ownerSurname: 'string',
    ownerPhone: 0,
    ownerEmail: 'string',
    ownerCNP: 0,
    ownerIdentityCard: 'string',
    vehicleManufacturer: 'string',
    vehicleModel: 'string',
    vehicleYear: 0,
    vehicleVinNumber: 'string',
    vehicleIdentityCard: 'string',
    vehicleNumberPlate: 'string',
    certificatePaymentProof: false,
    ownershipProof: 'string',
    details:"Cerere trimisă",
    status:"În așteptare",
    items:[]
  };

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {}

  onCreate(vehicle: VehicleRegistration) {
    this.vehicleService.createVehicle(vehicle).subscribe(
      (createdVehicle: VehicleRegistration) => {
        console.log('Vehicle created successfully:', createdVehicle);
        // Handle the created vehicle as needed
      },
      (error) => {
        console.error('Error creating vehicle:', error);
        // Handle error
      }
    );
  }
}
