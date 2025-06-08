import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NumberPlates } from '../../models/number-plates';
import { NumberPlatesService } from '../../admin/services/number-plates.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  vehicles: VehicleRegistration[] = [];
  reservedNumberPlates: NumberPlates[] = [];
  userEmail!: string;
  isLoadingResults = true;
  dataSource: VehicleRegistration[] = [];

  constructor(
    public http: HttpClient,
    public auth: AuthService,
    private numberPlateService: NumberPlatesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRegisteredVehiclesForUser();
    this.loadPlatesForUser();
  }

  loadRegisteredVehiclesForUser() {
    this.auth.user$.subscribe(user => {
      if (user && user.email) {
        this.userEmail = user.email;
        this.http.get<{ [key: string]: VehicleRegistration }>('https://vehicles-9f2ad.firebaseio.com/vehicles.json').subscribe(
          (vehiclesData) => {
            const vehiclesArray: VehicleRegistration[] = Object.values(vehiclesData);
            this.vehicles = vehiclesArray.filter(
              (vehicle) => vehicle.ownerEmail === this.userEmail && vehicle.status === 'Aprobat'
            );
            this.vehicles.reverse();
            this.dataSource = this.vehicles;
            this.isLoadingResults = false;
          },
          (error) => {
            console.error('Error fetching vehicles:', error);
            this.isLoadingResults = false;
          }
        );
      }
    });
  }

  loadPlatesForUser() {
    this.auth.user$.subscribe(user => {
      if (user && user.email) {
        this.userEmail = user.email;
        this.numberPlateService.getPlates(this.userEmail).subscribe(plates => {
          const currentDate = new Date();

          // Delete expired plates
          plates.forEach(plate => {
            if (new Date(plate.availability) < currentDate) {
              this.numberPlateService.deleteReservedNumberPlate(plate._id).subscribe({
                next: () => console.log('Deleted expired plate:', plate.reservedVehicleNumberPlate),
                error: err => console.error('Failed to delete expired plate:', err)
              });
            }
          });

          // Filter out expired plates after deletion check
          this.reservedNumberPlates = plates.filter(
            plate => new Date(plate.availability) >= currentDate
          ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        }, error => {
          console.error('Error fetching number plates:', error);
        });
      }
    });
  }
}
