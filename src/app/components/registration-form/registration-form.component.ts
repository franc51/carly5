import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { VehicleService } from '../../admin/services/vehicle.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
  providers: [DatePipe],
})
export class RegistrationFormComponent {
  @Output() make = new EventEmitter<VehicleRegistration>();
  @Output() update = new EventEmitter<VehicleRegistration>();

  @Input() vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];
  userInput: string = '';
  matchingNumberPlate: string | undefined;

  isMatchingPattern = (userInput: string): boolean => {
    const pattern = /^[A-Z]{2}\d{2}[A-Z]{3}$/;
    return pattern.test(userInput);
  };

  result = this.isMatchingPattern(this.userInput);
  numberPlate: any;

  searchNumberPlate(numberPlate: string): void {
    if (this.isMatchingPattern) {
      console.log(this.isMatchingPattern(this.userInput));
      // Use find method to search for a matching vehicle registration
      const foundVehicle = this.vehicles.find(
        (vehicle: VehicleRegistration) =>
          vehicle.vehicleNumberPlate === this.userInput
      );
      if (foundVehicle) {
        // If a matching vehicle registration is found we
        console.log('Matching vehicle found:', foundVehicle);
      } else {
        // If no matching vehicle is found
        console.log('No matching vehicle found');
      }
    }
  }

  // provides the service
  constructor(
    public vehicleService: VehicleService,
    private datePipe: DatePipe
  ) {}

  trackById(index: number, value: VehicleRegistration) {
    return value.id;
  }
  displayedColumns: string[] = [
    'id',
    'vehicleManufacturer',
    'vehicleModel',
    'date',
    'status',
  ];
  dataSource = this.vehicle;

  handleCreate(form: NgForm) {
    if (form.valid) {
      this.make.emit(form.value);
      console.log(form.value);
    }
    return;
  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || ''; // Adjust format as per your requirement
  }
}
