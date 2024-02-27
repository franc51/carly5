import { Component, Input } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';

@Component({
  selector: 'app-registration-history',
  templateUrl: './registration-history.component.html',
  styleUrl: './registration-history.component.css',
})
export class RegistrationHistoryComponent {
  vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];

  ngOnInit(): void {
    this.vehicles = [
      {
        id: 'B02JF33',
        date: '24.03.2024',
        ownerName: 'ownerName',
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
        status: 'Respins',
      },
      {
        id: 'AP20TJF',
        date: '24.03.2024',
        ownerName: 'ownerName',
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
        details: 'Talonul si placutele de inmatriculare au fost trimise',
        status: 'Aprobat',
      },
      {
        id: 'AP29VJ4',
        date: '12.01.2022',
        ownerName: 'ownerName',
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
        details: 'Talonul si placutele de inmatriculare au fost trimise',
        status: 'Aprobat',
      },
    ];
  }

  trackById(index: number, value: VehicleRegistration) {
    return value.id;
  }
  displayedColumns: string[] = [
    'vehicleManufacturer',
    'vehicleModel',
    'date',
    'status',
    'details',
  ];
  dataSource = this.vehicle;
}
