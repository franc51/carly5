import { Component } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];

  ngOnInit(): void {
    this.vehicles = [];
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
  dataSource = this.vehicle;
}
