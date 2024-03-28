import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  providers: [DatePipe],
})
export class RegistrationFormComponent {
  @Output() create = new EventEmitter<VehicleRegistration>();

  @Input() vehicle!: VehicleRegistration;
  userInput: any;
  formSubmitted = false;

  constructor(private datePipe: DatePipe) {}

  onCreateVehicle(form: NgForm): void {
    if (form.valid && form.submitted) {
      const formValue = form.value;

      // Ensure all required properties are present
      const newVehicle: VehicleRegistration = {
        ...formValue,
        _id: uuidv4(),
        date: new Date(), // Assign a new Date object
        details: 'Cerere trimisă',
        status: 'În așteptare',
        ownerCNP: 1,
        ownerIdentityCard: 's',
        vehicleYear: 1,
        vehicleIdentityCard: 'file',
        certificatePaymentProof: false,
        ownershipProof: 'file',
        isAccepted: false,
        vehicleNumberPlate: this.userInput,
      };

      this.create.emit(newVehicle);
      form.reset();
    }
  }

  isInputMatchingPattern(input: string): boolean {
    // Define your pattern matching logic here
    const pattern = /^[A-Z]{2}\d{2}[A-Z]{3}$/;
    return pattern.test(input);
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || ''; // Adjust format as per your requirement
  }
}
