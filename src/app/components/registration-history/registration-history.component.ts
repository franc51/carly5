import { Component, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { AuthService } from '@auth0/auth0-angular';
import { FirebaseService } from '../../admin/services/firebase.service';
import { HttpClient } from '@angular/common/http';

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
    public firebaseService: FirebaseService,
    public http: HttpClient
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
    this.loadVehiclesForUser();
  }
  loadVehiclesForUser() {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userEmail = user.email as string;

        if (!this.userEmail) {
          console.error('User email is undefined');
          return;
        }

        // Make HTTP GET request to fetch vehicles from Firebase
        this.http.get<{ [key: string]: VehicleRegistration }>('https://vehicles-9f2ad.firebaseio.com/vehicles.json').subscribe(
          (vehiclesData) => {
            // Convert the response data to an array
            const vehiclesArray: VehicleRegistration[] = Object.values(vehiclesData);
            // Filter vehicles to render only the ones belonging to the logged-in user
            this.vehicles = vehiclesArray.filter(
              (vehicle) => vehicle.ownerEmail === this.userEmail
            );
            this.vehicles.reverse();
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
