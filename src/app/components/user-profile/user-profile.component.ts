import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { FirebaseService } from '../../admin/services/firebase.service';
import { HttpClient } from '@angular/common/http';
import { VehicleRegistration } from '../../model/vehicle-registration';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  vehicles: VehicleRegistration[] = [];
  userEmail!: string;
  isLoadingResults = false;
  dataSource: VehicleRegistration[] = [];

  constructor(private auth: AuthService, private firebaseService: FirebaseService, private http: HttpClient){}

  ngOnInit() {
    this.loadRegisteredVehiclesForUser();
  }

  loadRegisteredVehiclesForUser() {
  this.auth.user$.subscribe((user) => {
    if (user) {
      this.userEmail = user.email as string;

      if (!this.userEmail) {
        console.error('User email is undefined');
        return;
      }

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
        }
      );
    }
  });
}

}
