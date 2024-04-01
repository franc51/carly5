import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Database } from 'firebase/database';
import { Observable, catchError, from, map } from 'rxjs';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { HttpClient } from '@angular/common/http';
import { NumberPlates } from '../../model/number-plates';

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
    const url = `${this.databaseUrl}`;
    return this.http.post(url, reservedNumberPlate);
  }
}
