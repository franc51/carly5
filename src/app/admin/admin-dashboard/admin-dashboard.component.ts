import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];

  constructor(private vehicleService: VehicleService) {}

  @Output() update = new EventEmitter<VehicleRegistration>();
  @Output() delete = new EventEmitter<VehicleRegistration>();

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
  dataSource = this.vehicleService.read();

  handleUpdate(form: NgForm, vehicle: VehicleRegistration) {
    if (form.valid && vehicle) {
      if (confirm('Sigur respingi cererea?')) {
        {
          this.update.emit({ id: vehicle.id, ...form.value });
          console.log(this.vehicles);
        }
      }
    }
    return;
  }

  handleDelete() {
    if (confirm(`Sigur respingi cererea?`)) {
      this.delete.emit({ ...this.vehicle });
    }
    return;
  }

  ngOnInit(): void {
    // takes state and makes it available inside components
    this.vehicleService
      .read()
      .subscribe(
        (vehicles: VehicleRegistration[]) => (this.vehicles = vehicles)
      );
  }
}
