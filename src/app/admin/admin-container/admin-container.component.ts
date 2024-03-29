import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrl: './admin-container.component.css',
})
export class AdminContainerComponent {
  @Input() vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];
  @Output() update = new EventEmitter<VehicleRegistration>();

  onUpdate(vehicle: VehicleRegistration) {
    this.vehicleService.updateVehicle(vehicle);
  }
  constructor(private vehicleService: VehicleService) {}
}
