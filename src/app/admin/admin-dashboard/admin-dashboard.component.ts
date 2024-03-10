import { Component } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];

  ngOnInit(): void {
    this.vehicles = [
      {
        id: 'B02JF33',
        date: '24.03.2024',
        ownerName: 'ownerName',
        ownerSurname: 'aotngs[glomns[dgo',
        ownerPhone: 'string',
        ownerCNP: 12324,
        ownerIdentityCard: 'ownerIdentityCard',
        vehicleManufacturer: 'KIA',
        vehicleModel: 'CEED',
        vehicleYear: 2003,
        vehicleVinNumber: 'WVW527HF7FF320A',
        vehicleIdentityCard: 'vehicleIdentityCard',
        vehicleNumberPlate: 'MM47GHK',
        certificatePaymentProof: true,
        ownershipProof: 'ownershipProof',
        details: 'Lipsa asigurare',
        status: 'În așteptare',
      },
      {
        id: 'AP20TJF',
        date: '24.03.2024',
        ownerName: 'ownerName',
        ownerSurname: 'aotngs[f3-gdgo',
        ownerPhone: 'string',
        ownerCNP: 12324,
        ownerIdentityCard: 'ownerIdentityCard',
        vehicleManufacturer: 'MERCEDES',
        vehicleModel: 'AMG',
        vehicleYear: 2003,
        vehicleVinNumber: 'WVW527HF7FF320A',
        vehicleIdentityCard: 'vehicleIdentityCard',
        vehicleNumberPlate: 'MM47GHK',
        certificatePaymentProof: true,
        ownershipProof: 'ownershipProof',
        details: 'Lipsa asigurare',
        status: 'În așteptare',
      },
      {
        id: 'AP29VJ4',
        date: '12.01.2022',
        ownerName: 'ownerName',
        ownerSurname: 'aotngs[glomns[dgo',
        ownerPhone: 'string',
        ownerCNP: 12324,
        ownerIdentityCard: 'ownerIdentityCard',
        vehicleManufacturer: 'VOLKSWAGEN',
        vehicleModel: 'ARTEON',
        vehicleYear: 2003,
        vehicleVinNumber: 'WVW527HF7FF320A',
        vehicleIdentityCard: 'vehicleIdentityCard',
        vehicleNumberPlate: 'MM47GHK',
        certificatePaymentProof: true,
        ownershipProof: 'ownershipProof',
        details: 'Lipsa asigurare',
        status: 'În așteptare',
      },
    ];
  }

  trackById(index: number, value: VehicleRegistration) {
    return value.id;
  }
  displayedColumns: string[] = [
    'ownerName',
    'ownerSurname',
    'ownerPhone',
    'vehicleManufacturer',
    'vehicleModel',
    'numberPlate',
    'date',
    'details',
  ];
  dataSource = this.vehicle;
}
