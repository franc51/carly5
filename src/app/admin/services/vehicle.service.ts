// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, map } from 'rxjs';
// import { VehicleRegistration } from '../../model/vehicle-registration';

// @Injectable({
//   providedIn: 'root',
// })
// export class VehicleService {
//   private baseUrl = '';

//   constructor(private http: HttpClient) {}

//   getAllVehicles(): Observable<VehicleRegistration[]> {
//     return this.http.get<VehicleRegistration[]>(this.baseUrl);
//   }

//   // method to fetch vehicles for a specific user
//   getAllVehiclesForUser(email: string): Observable<VehicleRegistration[]> {
//     const url = `${this.baseUrl}?email=${email}`;
//     return this.http.get<VehicleRegistration[]>(url);
//   }

//   createVehicle(vehicle: VehicleRegistration): Observable<VehicleRegistration> {
//     return this.http.post<VehicleRegistration>(this.baseUrl, vehicle);
//   }

//   updateVehicle(vehicle: VehicleRegistration): Observable<VehicleRegistration> {
//     const url = `${this.baseUrl}/${vehicle._id}`;
//     return this.http.put<VehicleRegistration>(url, vehicle);
//   }

//   deleteVehicle(id: string): Observable<void> {
//     const url = `${this.baseUrl}/${id}`;
//     return this.http.delete<void>(url);
//   }

//   getAdminHistory(): Observable<VehicleRegistration[]> {
//     return this.getAllVehicles().pipe(
//       map((vehicles: VehicleRegistration[]) => {
//         return vehicles.filter(
//           (vehicle) => vehicle.details !== 'Cerere trimisă'
//         );
//       })
//     );
//   }

//   getAcceptedVehicles(): Observable<VehicleRegistration[]> {
//     return this.getAllVehicles().pipe(
//       map((vehicles: VehicleRegistration[]) => {
//         return vehicles.filter(
//           (vehicle) => vehicle.details !== 'Cerere trimisă'
//         );
//       })
//     );
//   }

//   getAllRequests(): Observable<VehicleRegistration[]> {
//     return this.getAllVehicles().pipe(
//       map((vehicles: VehicleRegistration[]) => {
//         return vehicles.filter(
//           (vehicle) => vehicle.details === 'Cerere trimisă'
//         );
//       })
//     );
//   }

//   getUsedNumberPlates(): Observable<VehicleRegistration[]> {
//     return this.getAllVehicles().pipe(
//       map((vehicles: VehicleRegistration[]) => {
//         return vehicles.filter(
//           (vehicle) => vehicle.vehicleNumberPlate === 'Cerere trimisă'
//         );
//       })
//     );
//   }
// }
