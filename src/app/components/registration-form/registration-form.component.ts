import { Component, Inject } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent {
  vehicle!: VehicleRegistration;
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

  ngOnInit(): void {
    this.vehicles = [
      {
        id: 'B02JF33',
        date: '24.03.2024',
        ownerName: 'ownerName',
        ownerSurname: 'apdfihagoisn',
        ownerPhone: '0712312312',
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
        ownerSurname: 'apdfihagoisn',
        ownerPhone: '0712312312',
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

        status: 'Aprobat',
      },
      {
        id: 'AP29VJ4',
        date: '12.01.2022',
        ownerName: 'ownerName',
        ownerSurname: 'apdfihagoisn',
        ownerPhone: '0712312312',
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
        status: 'Aprobat',
      },
    ];
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

  handleSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
    }
    return;
  }
}
