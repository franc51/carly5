import { Component, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '@auth0/auth0-angular';

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
  ];

  dataSource = this.firebaseService.getAdminDashboard();
  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user && user.email) {
        const userEmail = user.email;
        this.firebaseService.getAllVehicles(userEmail).subscribe(
          (vehicles: VehicleRegistration[]) => {
            this.isLoadingResults = false;
          },
          (error: any) => {
            console.error('Error fetching vehicles:', error);
          }
        );
      } else {
        console.error('User email is undefined');
        // Handle undefined email if necessary
      }
    });
  }
}
