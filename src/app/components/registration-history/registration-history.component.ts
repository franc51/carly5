import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-registration-history',
  templateUrl: './registration-history.component.html',
  styleUrl: './registration-history.component.css',
})
export class RegistrationHistoryComponent{
  vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];

  dataSource: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = [
    'vehicleManufacturer',
    'vehicleModel',
    'date',
    'numberPlate',
    'details',
    'status',
  ];

constructor (){
  this.dataSource = new MatTableDataSource<VehicleRegistration>(this.vehicles);
}

  ngOnInit(): void {
    this.vehicles = [
      {
        id: 'B02JF33',
        date: '24.03.2024',
        ownerName: 'ownerName',
        ownerSurname: 'adpisngo',
        ownerPhone: 'string',
        ownerEmail: 'string',

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
      }
    ];
  }

  trackById(index: number, value: VehicleRegistration) {
    return value.id;
  }


}
