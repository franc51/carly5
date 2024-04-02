import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Database } from 'firebase/database';
import { Observable, catchError, from, map } from 'rxjs';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { HttpClient } from '@angular/common/http';
import { NumberPlates } from '../../model/number-plates';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NumberPlatesService {
  private firebaseApp!: FirebaseApp;
  private analytics!: Analytics;
  private database!: Database;

  constructor(private http: HttpClient) {}

  private databaseUrl = 'https://reserved-plates.firebaseio.com';

  getNumberPlates(reservedNumberPlate: NumberPlates): Observable<any> {
    return this.http.get<any>(this.databaseUrl);
  }
  createReservedNumberPlate(
    reservedNumberPlate: NumberPlates
  ): Observable<any> {
    const url = `${this.databaseUrl}/number-plates.json`;
    return this.http.post(url, reservedNumberPlate);
  }
  checkNumberPlateExists(numberPlate: string): Observable<boolean> {
    const url = `${this.databaseUrl}/number-plates.json`;
    return this.http.get<any>(url).pipe(
      map((data: { [key: string]: NumberPlates }) => {
        // Check if the number plate already exists in the database
        const numberPlates = Object.values(data || {});
        return numberPlates.some(
          (plate: NumberPlates) =>
            plate.reservedVehicleNumberPlate === numberPlate
        );
      }),
      catchError(error => {
        console.error('Error fetching number plates:', error);
        // You can handle the error here or rethrow it
        return throwError('Error fetching number plates');
      })
    );
  }
}
