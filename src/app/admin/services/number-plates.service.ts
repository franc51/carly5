import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Database } from 'firebase/database';
import { Observable, catchError, from, map } from 'rxjs';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NumberPlatesService {
  private firebaseApp!: FirebaseApp;
  private analytics!: Analytics;
  private database!: Database;

  constructor(private http: HttpClient) {}

  private databaseUrl = 'https://reserved-plates.firebaseio.com';

}
