import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleRegistration } from '../../model/vehicle-registration';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = 'http://localhost:3000/api/vehicles'; // Adjust the URL

  constructor(private http: HttpClient) {}

  getAllVehicles(): Observable<VehicleRegistration[]> {
    return this.http.get<VehicleRegistration[]>(this.baseUrl);
  }

  createVehicle(vehicle: VehicleRegistration): Observable<VehicleRegistration> {
    return this.http.post<VehicleRegistration>(this.baseUrl, vehicle);
  }

  updateVehicle(vehicle: VehicleRegistration): Observable<VehicleRegistration> {
    const url = `${this.baseUrl}/${vehicle.id}`;
    return this.http.put<VehicleRegistration>(url, vehicle);
  }

  deleteVehicle(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
