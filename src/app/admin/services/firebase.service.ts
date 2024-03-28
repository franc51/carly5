import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Database } from 'firebase/database';
import { Observable, from } from 'rxjs';
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
    const url = `${this.databaseUrl}/vehicles.json`; // .json is required by Firebase REST API
    return this.http.post(url, vehicle);
  }
  getAllVehicles(userEmail: string): Observable<VehicleRegistration[]> {
    const url = `${this.databaseUrl}/vehicles.json?orderBy="ownerEmail"&equalTo="${userEmail}"`;
    return this.http.get<VehicleRegistration[]>(url);
  }
}
