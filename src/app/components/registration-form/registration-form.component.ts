import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { VehicleService } from '../../admin/services/vehicle.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
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

  searchNumberPlate(numberPlate: String): void {
    if (this.isMatchingPattern) {
      console.log(this.isMatchingPattern(this.userInput));
      this.matchingNumberPlate = this.numberPlate.find(
        (item: string) => item === this.userInput
      );
    }
    if (this.matchingNumberPlate === this.userInput) {
    }
  }

  // provides the service
  constructor(public vehicleService: VehicleService) {}
  ngOnInit(): void {
    // takes state and makes it available inside components
    this.vehicles = this.vehicleService.read();
  }

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
    }
    return;
  }
  handleUpdate(form: NgForm) {
    if (form.valid) {
      this.update.emit({ id: this.vehicle.id, ...form.value}) ;
    }
    return;
  }
}
