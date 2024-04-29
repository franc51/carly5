import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Database } from 'firebase/database';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firebaseApp!: FirebaseApp;
  private analytics!: Analytics;
  private database!: Database;

  constructor(private http: HttpClient) {}

  private databaseUrl = 'https://vehicles-9f2ad.firebaseio.com';

  createVehicle(vehicle: VehicleRegistration): Observable<any> {
    // Check if the vehicle already exists based on your criteria
    return this.vehicleExists(vehicle).pipe(
      switchMap((exists) => {
        if (!exists) {
          // If the vehicle doesn't exist, add it to the database
          const url = `${this.databaseUrl}/vehicles.json`;
          return this.http.post(url, vehicle);
        } else {
          // If the vehicle already exists, return an error
          return throwError('Vehicle already exists');
        }
      }),
      catchError((error) => throwError('Failed to create vehicle'))
    );
  }

  public vehicleExists(vehicle: VehicleRegistration): Observable<boolean> {
    const url = `${this.databaseUrl}/vehicles.json`;
    // Query the database to check if the vehicle already exists
    return this.http.get<{ [key: string]: VehicleRegistration }>(url).pipe(
      map((response) => {
        if (response) {
          const vehicles = Object.values(response);
          // Check if a vehicle with the same number plate exists
          const exists = vehicles.some(
            (v) => v.vehicleNumberPlate === vehicle.vehicleNumberPlate
          );
          return exists;
        } else {
          return false;
        }
      })
    );
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
  getAllNumberPlates(): Observable<VehicleRegistration[]> {
    const url = `${this.databaseUrl}/vehicles.json`;
    return this.http.get<VehicleRegistration[]>(url);
  }
}
