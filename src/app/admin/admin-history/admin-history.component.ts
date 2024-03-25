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
  isLoadingResults = true;

  constructor(private vehicleService: VehicleService) {}

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
  dataSource = this.vehicleService.getAllVehicles();

  ngOnInit(): void {
    // takes state and makes it available inside components
    this.vehicleService
      .getAdminHistory()
      .subscribe(
        (vehicles: VehicleRegistration[]) => (
          (this.vehicles = vehicles),
          (vehicles = vehicles.reverse()),
          (this.isLoadingResults = false)
        )
      );
  }
}
