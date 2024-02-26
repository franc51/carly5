import { Component, Input } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';

@Component({
  selector: 'app-registration-history',
  templateUrl: './registration-history.component.html',
  styleUrl: './registration-history.component.css',
})
export class RegistrationHistoryComponent {
  @Input() vehicle!: VehicleRegistration;
  displayedColumns: string[] = [
    'id',
    'vehicleManufacturer',
    'vehicleModel',
    'date',
    'status',
  ];
  dataSource = this.vehicle;
}
