import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Database } from 'firebase/database';
import { Observable, catchError, from, map } from 'rxjs';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { User } from '../../model/users.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firebaseApp!: FirebaseApp;
  private analytics!: Analytics;
  private database!: Database;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private databaseUrl = 'https://vehicles-9f2ad.firebaseio.com';
  private usersUrl = 'https://users-acb6a.firebaseio.com';

  createVehicle(vehicle: VehicleRegistration): Observable<any> {
    const url = `${this.databaseUrl}/vehicles.json`;
    return this.http.post(url, vehicle);
  }
  getAllVehicles(userEmail: string): Observable<VehicleRegistration[]> {
    const url = `${this.databaseUrl}/vehicles.json?orderBy="ownerEmail"&equalTo="${userEmail}"`;
    return this.http.get<VehicleRegistration[]>(url);
  }

  getAdminDashboard(): Observable<VehicleRegistration[]> {
    // this method also retrieves numberPlates in the reserveNumberplates component
    const url = `${this.databaseUrl}/vehicles.json`;
    return this.http.get<{ [key: string]: VehicleRegistration }>(url).pipe(
      map((response) => {
        const vehicles: VehicleRegistration[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            vehicles.push({ ...response[key], _id: key });
          }
        }
        return vehicles;
      }),
      catchError((error) => {
        console.error('Error fetching vehicles:', error);
        throw error; // Rethrow the error for the component to handle
      })
    );
  }

  updateVehicle(
    vehicleId: string,
    updatedVehicle: VehicleRegistration
  ): Observable<any> {
    const url = `${this.databaseUrl}/vehicles/${vehicleId}.json`;
    return this.http.put(url, updatedVehicle);
  }

   updateUser(
    userId: string,
    updatedUser: User
  ): Observable<any> {
    const url = `${this.usersUrl}/users/${userId}.json`;
    return this.http.put(url, updatedUser);
  }

 saveUserProfile(userId: string, userData: User): Observable<any> {
  const url = `${this.usersUrl}/users/${userId}.json`;
  this.snackBar.open("Profil salvat cu succes.","Închide");
  return this.http.put(url, userData);

}

getUserProfile(userId: string): Observable<User> {
  const url = `${this.usersUrl}/users/${userId}.json`;
  return this.http.get<User>(url);
}



  getAllNumberPlates(): Observable<VehicleRegistration[]> {
    const url = `${this.databaseUrl}/vehicles.json`;
    return this.http.get<VehicleRegistration[]>(url);
  }
}
