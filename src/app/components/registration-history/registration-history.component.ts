import { Component, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { AuthService } from '@auth0/auth0-angular';
import { FirebaseService } from '../../admin/services/firebase.service';

@Component({
  selector: 'app-registration-history',
  templateUrl: './registration-history.component.html',
  styleUrls: ['./registration-history.component.css'],
})
export class RegistrationHistoryComponent implements OnInit {
  vehicles: VehicleRegistration[] = [];
  isLoadingResults = true;
  userEmail!: string;

  constructor(
    public auth: AuthService,
    public firebaseService: FirebaseService
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
  dataSource: VehicleRegistration[] = [];

  ngOnInit(): void {
    // Subscribe to Auth0's user$ observable to get user information
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userEmail = user.email as string; // Get the logged-in user's email

        // Check if userEmail is undefined
        if (!this.userEmail) {
          console.error('User email is undefined');
          return;
        }

        // Call the method from the FirebaseService instance
        this.firebaseService.getAllVehicles(this.userEmail).subscribe(
          (vehiclesArray: VehicleRegistration[]) => {
            // Filter vehicles to render only the ones belonging to the logged-in user
            this.vehicles = vehiclesArray.filter(
              (vehicle) => vehicle.ownerEmail === this.userEmail
            );

            // Reverse the order of fetched vehicles
            this.vehicles.reverse();
            // Assign fetched vehicles to the dataSource
            this.dataSource = this.vehicles;
            this.isLoadingResults = false;
          },
          (error) => {
            console.error('Error fetching vehicles:', error);
          }
        );
      }
    });
  }
}
