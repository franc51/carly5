import { Component, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { VehicleService } from '../../admin/services/vehicle.service';
import { AuthService } from '@auth0/auth0-angular';

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
    private vehicleService: VehicleService,
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
  dataSource: VehicleRegistration[] = [];

  ngOnInit(): void {
    // Subscribe to Auth0's user$ observable to get user information
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userEmail = user.email as string; // Get the logged-in user's email
        // Call the method from the VehicleService instance
        this.vehicleService.getAllVehiclesForUser(this.userEmail).subscribe(
          (vehicles: VehicleRegistration[]) => {
            // Filter vehicles to render only the ones belonging to the logged-in user
            this.vehicles = vehicles.filter(
              (vehicle) => vehicle.ownerEmail === this.userEmail
            );
            // Reverse the vehicles array to render the last object first
            this.vehicles = vehicles.reverse();
            // Assign fetched vehicles to the dataSource
            this.dataSource = this.vehicles;
            console.log(this.userEmail);
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
