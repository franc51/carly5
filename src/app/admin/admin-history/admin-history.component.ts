import { Component, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrl: './admin-history.component.css',
})
export class AdminHistoryComponent implements OnInit {
  vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];

  constructor(private vehicleService: VehicleService) {}

  displayedColumns: string[] = [
    'ownerName',
    'ownerSurname',
    'ownerPhone',
    'vehicleManufacturer',
    'vehicleModel',
    'numberPlate',
    'date',
  ];
  dataSource = this.vehicleService.getAllVehicles();

  ngOnInit(): void {
    // takes state and makes it available inside components
    this.vehicleService
      .getAllVehicles()
      .subscribe(
        (vehicles: VehicleRegistration[]) => (this.vehicles = vehicles, vehicles = vehicles.reverse())
      );
  }
}
