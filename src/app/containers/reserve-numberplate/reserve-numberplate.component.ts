import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from '../../admin/services/firebase.service';
import { NumberPlates } from '../../model/number-plates';
import { NumberPlatesService } from '../../admin/services/number-plates.service';
import { ReserveContainerComponent } from '../reserve-container/reserve-container.component';

@Component({
  selector: 'app-reserve-numberplate',
  templateUrl: './reserve-numberplate.component.html',
  styleUrl: './reserve-numberplate.component.css',
})
export class ReserveNumberplateComponent implements OnInit {
  @Output() reserve = new EventEmitter<NumberPlates>();
  @Output() plateExists = new EventEmitter<boolean>();

  vehicles: VehicleRegistration[] = [];
  reservedNumberPlates: NumberPlates[] = [];
  userEmail!: string;
  isLoadingResults = true;

  constructor(
    public auth: AuthService,
    private firebaseService: FirebaseService,
    private reservedNumbers: NumberPlatesService
  ) {}
  displayedColumns: string[] = [
    'Nr. înmatriculare',
    'Rezervat în data',
    'Valabil până la data',
  ];

  dataSource: VehicleRegistration[] = [];

  userInput!: string;
  matchingNumberPlate: string | undefined;

  isMatchingPattern = (userInput: string): boolean => {
    const pattern = /^[A-Z]{2}\d{2}[A-Z]{3}$/;
    return pattern.test(userInput);
  };

  result = this.isMatchingPattern(this.userInput);

  onCreateReservation(form: NgForm): void {
    if (form.valid) {
      const formValue = form.value;

      // Ensure all required properties are present
      const reservedNumberPlate: NumberPlates = {
        ...formValue,
        _id: uuidv4(),
        date: new Date(), // Assign a new Date object
        reservedVehicleNumberPlate: this.userInput,
        availability: new Date(),
        reservedBy: 'user',
      };
      form.reset();
      this.reserve.emit(reservedNumberPlate);
      console.log("OncreateReservation method: " , reservedNumberPlate);
    }
  }

  searchNumberPlates(inputElement: HTMLInputElement): void {
    const userInput = inputElement.value; // Extracting the value from the HTMLInputElement
    console.log('User Input:', userInput);

    this.isLoadingResults = true;
    this.firebaseService.getAdminDashboard().subscribe(
      (vehicles: VehicleRegistration[]) => {
        console.log('Vehicles:', vehicles);

        if (vehicles && Array.isArray(vehicles)) {
          const filteredVehicles = vehicles.filter(
            (vehicle) => vehicle.vehicleNumberPlate === userInput
          );

          console.log('Filtered Vehicles:', filteredVehicles);

          this.vehicles = filteredVehicles;
          this.dataSource = filteredVehicles;
          this.isLoadingResults = false;
        } else {
          console.error('Error fetching vehicles: Invalid data format');
        }
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  // searchReservedNumberPlates(inputElement: HTMLInputElement): void {
  //   const userInput = inputElement.value.toUpperCase(); // Extracting the value from the HTMLInputElement and converting to uppercase
  //   console.log('User Input:', userInput);

  //   this.isLoadingResults = true;
  //   this.reservedNumbers.getNumberPlates().subscribe(
  //     (result: NumberPlates[]) => {
  //       console.log('Search Result:', result);

  //       this.reservedNumberPlates = result;
  //       this.isLoadingResults = false;
  //     },
  //     (error: any) => {
  //       console.error('Error searching reserved number plates:', error);
  //       this.isLoadingResults = false;
  //     }
  //   );
  // }

  ngOnInit(): void {
    this.isLoadingResults = false;
  }
  openLink() {
    window.open('https://buy.stripe.com/test_eVa7vKcbwbdW1jifYY');
  }
}
