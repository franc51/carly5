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
    // this.vehicle = this.vehicleService.readOne('B02JF33');
  }
  onCreate(vehicle: VehicleRegistration) {
    this.vehicleService.giveBirth(vehicle);
  }
  onUpdate(vehicle: VehicleRegistration) {
    this.vehicleService.update(vehicle);
  }
}
