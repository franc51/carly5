import { Component, Input, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { VehicleService } from '../../admin/services/vehicle.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.css',
})
export class RegistrationsComponent implements OnInit {
  vehicle: VehicleRegistration = {
    id: '',
    date: new Date(),
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
    certificatePaymentProof: false,
    ownershipProof: '',
    details: 'Cerere trimisă',
    status: 'În așteptare',
    count: 0,
    items: undefined,
    total_count: 0,
    isAccepted: false,
  };
  datePipe: any;
  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    // this.vehicle = this.vehicleService.readOne('B02JF33');
  }
  onCreate(vehicle: VehicleRegistration) {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(
      currentDate,
      'yyyy-MM-dd HH:mm:ss'
    );
    this.vehicleService.createVehicle(vehicle);
  }

  onUpdate(vehicle: VehicleRegistration) {
    this.vehicleService.updateVehicle(vehicle);
  }
}
