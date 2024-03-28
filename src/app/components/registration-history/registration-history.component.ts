import { Component, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { VehicleService } from '../../admin/services/vehicle.service';
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
    private vehicleService: VehicleService,
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
  dataSource: VehicleRegistration[] = [];

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userEmail = user.email as string;
        this.firebaseService.getAllVehicles(this.userEmail).subscribe(
          (data: any) => {
            // Convert the object into an array of VehicleRegistration objects
            this.vehicles = Object.values(data).map((vehicle: any) => vehicle);
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
