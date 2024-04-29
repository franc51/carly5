import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { FirebaseService } from '../../admin/services/firebase.service';
import { DatePipe } from '@angular/common';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { OutputFileEntry } from '@uploadcare/blocks';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css'],
})
export class RegistrationsComponent implements OnInit {
  files: OutputFileEntry<'success'>[] = [];

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

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {}

  onCreate(
    vehicle: VehicleRegistration,
    files: OutputFileEntry<'success'>[]
  ): void {
    // Convert the file URLs to strings before assigning them to the vehicle object
    const vehicleWithUrls: VehicleRegistration = {
      ...vehicle,
      ownerIdentityCard: files[0]?.cdnUrl || '',
      vehicleIdentityCard: files[1]?.cdnUrl || '',
      ownershipProof: files[2]?.cdnUrl || '',
    };

    this.firebaseService.createVehicle(vehicleWithUrls).subscribe(
      (createdVehicle: VehicleRegistration) => {
        console.log(' parent component : ', files);
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
