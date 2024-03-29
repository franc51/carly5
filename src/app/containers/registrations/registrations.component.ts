import { Component, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { VehicleService } from '../../admin/services/vehicle.service';
import { DatePipe } from '@angular/common';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css'],
})
export class RegistrationsComponent implements OnInit {
  vehicle: VehicleRegistration = {
    _id: uuidv4(), // Generate UUID for _id
    date: new Date(),
    ownerName: '',
    ownerSurname: '',
    ownerPhone: 0,
    ownerEmail: '',
    ownerCNP: 0,
    ownerIdentityCard: '',
    vehicleManufacturer: '',
    vehicleModel: '',
    vehicleYear: 0,
    vehicleVinNumber: '',
    vehicleIdentityCard: '',
    vehicleNumberPlate: '',
    certificatePaymentProof: false,
    ownershipProof: '',
    details: 'Cerere trimisă',
    status: 'În așteptare',
    count: 0,
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
