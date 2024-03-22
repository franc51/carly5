import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { VehicleService } from '../services/vehicle.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  vehicles: VehicleRegistration[] = [];
  dataSource: VehicleRegistration[] = [];

  constructor(private vehicleService: VehicleService) {}

  @Output() update = new EventEmitter<VehicleRegistration>();
  @Output() delete = new EventEmitter<VehicleRegistration>();

  trackById(index: number, value: VehicleRegistration) {
    return value._id;
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

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getAcceptedVehicles().subscribe(
      (vehicles: VehicleRegistration[]) => {
        this.vehicles = vehicles;
        this.dataSource = vehicles;
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }


  onUpdateVehicle(form: NgForm,updatedVehicle: VehicleRegistration): void {
    this.vehicleService.updateVehicle(updatedVehicle).subscribe(
      (response: VehicleRegistration) => {
        console.log('Vehicle updated successfully:', response);
        this.loadVehicles(); // Reload the vehicles after successful update
      },
      (error) => {
        console.error('Error updating vehicle:', error);
      }
    );
  }
}
