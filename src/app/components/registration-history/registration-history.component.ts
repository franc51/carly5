import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { VehicleService } from '../../admin/services/vehicle.service';

@Component({
  selector: 'app-registration-history',
  templateUrl: './registration-history.component.html',
  styleUrls: ['./registration-history.component.css'],
})
export class RegistrationHistoryComponent implements OnInit {
  vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];
  isLoadingResults = false;

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
    'status',
  ];
  dataSource = this.vehicleService.getAllVehicles();

  ngOnInit(): void {
    // takes state and makes it available inside components
    this.vehicleService
      .getAllVehicles()
      .subscribe(
        (vehicles: VehicleRegistration[]) => (this.vehicles = vehicles)
      );
  }
}
