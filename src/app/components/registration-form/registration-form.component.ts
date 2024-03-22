import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { VehicleService } from '../../admin/services/vehicle.service';
import { DatePipe } from '@angular/common';

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

  constructor(
    private vehicleService: VehicleService,
    private datePipe: DatePipe
  ) {}

  onCreateVehicle(form: NgForm): void {
    if (form.valid) {
      const formValue = form.value;

      // Ensure all required properties are present
      const newVehicle: VehicleRegistration = {
        ...formValue,
        date: new Date(), // Assign a new Date object
        status: 'În așteptare', // Set default value for status
        isAccepted: false,
        count: 0
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
