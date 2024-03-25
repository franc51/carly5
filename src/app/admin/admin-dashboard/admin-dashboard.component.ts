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
  isLoadingResults = true;

  constructor(private vehicleService: VehicleService) {}

  @Output() update = new EventEmitter<VehicleRegistration>();
  @Output() delete = new EventEmitter<VehicleRegistration>();

  trackById(index: number, value: VehicleRegistration) {}

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
    this.vehicleService.getAllRequests().subscribe(
      (vehicles: VehicleRegistration[]) => {
        this.vehicles = vehicles;
        this.dataSource = vehicles;
        this.isLoadingResults = false;
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  onRejectVehicle(form: NgForm, updatedVehicle: VehicleRegistration): void {
    // Update the status field of the updatedVehicle object
    updatedVehicle.status = 'Respins';

    this.vehicleService.updateVehicle(updatedVehicle).subscribe(
      (response: VehicleRegistration) => {
        console.log('Vehicle updated successfully:', response);
        // Find the index of the updated vehicle in the vehicles array based on its _id
        const index = this.vehicles.findIndex(
          (vehicle) => vehicle._id === response._id
        );
        if (index !== -1) {
          // Reverse the order of fetched vehicles
          this.vehicles.reverse();
          // Update the vehicle in the vehicles array with the updated values
          this.vehicles[index] = response;

          // Update the dataSource array as well
          this.dataSource = [...this.vehicles];
        }
      },
      (error) => {
        console.error('Error updating vehicle:', error);
      }
    );
  }

  onApproveVehicle(form: NgForm, updatedVehicle: VehicleRegistration): void {
    // Update the status field of the updatedVehicle object
    updatedVehicle.status = 'Aprobat'; // Updating status
    updatedVehicle.details =
      'Certificatul de înmatriculare și numerele de înmatriculare au fost trimise.';
    this.vehicleService.updateVehicle(updatedVehicle).subscribe(
      (response: VehicleRegistration) => {
        console.log('Vehicle updated successfully:', response);
        // Find the index of the updated vehicle in the vehicles array based on its _id
        const index = this.vehicles.findIndex(
          (vehicle) => vehicle._id === response._id
        );
        if (index !== -1) {
          // Reverse the order of fetched vehicles
          this.vehicles.reverse();
          // Update the vehicle in the vehicles array with the updated values
          this.vehicles[index] = response;

          // Update the dataSource array as well
          this.dataSource = [...this.vehicles];
        }
      },
      (error) => {
        console.error('Error updating vehicle:', error);
      }
    );
  }
}
