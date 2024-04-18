import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Database } from 'firebase/database';
import { Observable, catchError, from, map, of, tap } from 'rxjs';
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

  getPlates(userEmail: string): Observable<NumberPlates[]> {
    const url = `${this.databaseUrl}/number-plates.json`;
    return this.http.get<{ [key: string]: NumberPlates }>(url).pipe(
      map((response) => {
        const plates: NumberPlates[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key) && response[key].ownerEmail === userEmail) {
            plates.push({ ...response[key], _id: key });
          }
        }
        return plates;
      }),
      catchError((error) => {
        console.error('Error fetching number plates:', error);
        return throwError(error);
      })
    );
  }

  createReservedNumberPlate(
    reservedNumberPlate: NumberPlates
  ): Observable<any> {
    const url = `${this.databaseUrl}/number-plates.json`;
    return this.http.post(url, reservedNumberPlate);
  }

  deleteReservedNumberPlate(numberPlateId: string): Observable<any> {
    const url = `${this.databaseUrl}/number-plates/${numberPlateId}.json`;
    return this.http.delete(url);
  }

  checkNumberPlateExists(userInput: string): Observable<boolean> {
    console.log('Type of userInput:', typeof userInput); // Log the type of userInput

    const url = `${this.databaseUrl}/number-plates.json`;
    return this.http.get<any>(url).pipe(
      map((data: { [key: string]: any }) => {
        // Iterate over the values of the object
        const numberPlates = Object.values(data || {});
        // Check if any of the nested objects contain the user input
        return numberPlates.some((plate: any) => {
          // Check if the nested object has the reservedVehicleNumberPlate property
          if (plate.reservedVehicleNumberPlate) {
            // Convert both stored plate and user input to uppercase for case-sensitive comparison
            return plate.reservedVehicleNumberPlate.toUpperCase() === userInput.toUpperCase();
          }
          return false;
        });
      }),
      catchError(error => {
        console.error('Error checking number plate:', error);
        // You can handle the error here or rethrow it
        return throwError('Error fetching number plates: ' + error.message);
      })
    );
  }


}
