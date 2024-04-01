import { Component, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrl: './admin-history.component.css',
})
export class AdminHistoryComponent implements OnInit {
  vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];
  isLoadingResults = true;

  constructor(
    private firebaseService: FirebaseService,
    public auth: AuthService
  ) {}

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

  dataSource = this.firebaseService.getAdminDashboard();
  ngOnInit(): void {
    this.loadVehicles();
  }
  loadVehicles(): void {
    this.firebaseService.getAdminDashboard().subscribe(
      (vehicles: VehicleRegistration[] | null) => {
        if (vehicles && Array.isArray(vehicles)) {
          this.vehicles = vehicles.reverse();
          // Filter vehicles where details property is "Cerere trimisa"
          const filteredVehicles = vehicles.filter(
            (vehicle) => vehicle.details !== 'Cerere trimisă'
          );

          this.vehicles = filteredVehicles;
          this.dataSource = new Observable((observer) => {
            observer.next(filteredVehicles); // Emit filtered vehicles
            observer.complete(); // Complete the Observable
          });
          this.isLoadingResults = false;
        } else {
          console.error('Error fetching vehicles: Invalid data format');
        }
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }
}
