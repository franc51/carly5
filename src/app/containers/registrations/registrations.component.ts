import { Component, Input, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { VehicleService } from '../../admin/services/vehicle.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.css',
})
export class RegistrationsComponent implements OnInit {
  vehicle!: VehicleRegistration;
  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    // find item from the vehicleService
    const id = '';
    // if there is no item i provide a prototype object
    this.vehicle = this.vehicleService.readOne('PPPAAA');
  }
  onCreate(vehicle: VehicleRegistration) {
    this.vehicleService.giveBirth(vehicle);
  }
  onUpdate(vehicle: VehicleRegistration){
    this.vehicleService.update(vehicle);
  }
}
