import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {

  vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];

  constructor(private vehicleService: VehicleService) {}

  @Output() update = new EventEmitter<VehicleRegistration>();

  ngOnInit(): void {
    this.vehicles = this.vehicleService.read();
  }

  trackById(index: number, value: VehicleRegistration) {
    return value.id;
  }
  displayedColumns: string[] = [
    'ownerName',
    'ownerSurname',
    'ownerPhone',
    'vehicleManufacturer',
    'vehicleModel',
    'numberPlate',
    'date',
    'details',
  ];
  dataSource = this.vehicleService.read();

  handleUpdate(form: NgForm, vehicle: VehicleRegistration) {
    if (form.valid && vehicle) {
      this.update.emit({ id: vehicle.id, ...form.value});
      console.log(this.vehicles);
    }
    return;
  }
}
