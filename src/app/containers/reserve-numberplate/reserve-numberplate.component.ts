import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
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
  @Input() reservationExists!: boolean;

  vehicles: VehicleRegistration[] = [];
  reservedNumberPlates: NumberPlates[] = [];

  //variable for displaying
  userEmail!: string;

  // variable for displaying the spinner when anything loads
  isLoadingResults = true;

  plateExists!: boolean;
  reservedPlateExists!: boolean;

     // variable for checking numberplates in the reserved-numberplates database
  isReserved!: boolean;

  // variable for checking numberplates in the vehicle registrations database
  isRegistered!: boolean;

  isPlateExistsAndReserved!: boolean;

  // variable for testing user input for the pattern
  result!: boolean;

  // showing in UI if it's NOT matching pattern
  isNotMatchingPattern!: boolean;

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

  dataSource: NumberPlates[] = [];

  userInput!: string;
  matchingNumberPlate: string | undefined;

  isMatchingPattern(userInput: string): boolean {
    const pattern = /^[A-Z]{2}\d{2}[A-Z]{3}$/;
    console.log("userinput from matching pattern: ", userInput);
    this.isNotMatchingPattern = false;
    return pattern.test(userInput);
  };

  onCreateReservation(form: NgForm): void {
    this.userInput = form.value.reservedVehicleNumberPlate;
    if (form.valid && this.isMatchingPattern(this.userInput)) {
      const formValue = form.value;

      // Ensure all required properties are present
      const reservedNumberPlate: NumberPlates = {
        ...formValue,
        _id: uuidv4(),
        date: new Date(), // Assign a new Date object
        availability: new Date(),
        reservedBy: 'user',
      };
      form.reset();
      this.reserve.emit(reservedNumberPlate);
      console.log("OncreateReservation method: " , reservedNumberPlate);
    }
    else {
      this.isNotMatchingPattern = true;
    }
  }

  searchNumberPlates(form: NgForm): void {
    const userInput = form.value.reservedVehicleNumberPlate;
    // Extract the number plate from the form
   if(this.isMatchingPattern(userInput)){
    console.log("isMatchingPattern: ",this.isMatchingPattern);
    console.log("after is matching pattern");

    this.isLoadingResults = true;
    this.firebaseService.getAdminDashboard().subscribe(
      (vehicles: VehicleRegistration[]) => {
        console.log('Vehicles:', vehicles);

        if (vehicles && Array.isArray(vehicles)) {
          const plateExists = vehicles.some(
            (vehicle) => vehicle.vehicleNumberPlate === userInput
          );
          this.isRegistered = plateExists;
          console.log("plateExists: ", plateExists);
        } else {
          console.error('Error fetching vehicles: Invalid data format');
        }
        this.isLoadingResults = false;
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
        this.isLoadingResults = false;
      }
    );
   }
}


  searchReservedNumberPlate(form: NgForm): void {
    const userInput = form.value.reservedVehicleNumberPlate;
    console.log(userInput);
    if(this.isMatchingPattern(userInput)){
    this.isLoadingResults = true;
    this.reservedNumbers.checkNumberPlateExists(userInput).subscribe(
      (reservedPlateExists: boolean) => {
        console.log('reservedPlateExists:', reservedPlateExists);
        this.isLoadingResults = false;
        this.isReserved = reservedPlateExists;
      },
      (error: any) => {
        console.error('Error checking number plate:', error);
        this.isLoadingResults = false;
      }
    );
    }
    else {
      this.isNotMatchingPattern = true;
    }
  }


  ngOnInit(): void {
    this.isLoadingResults = false;
  }
  openLink() {
    window.open('https://buy.stripe.com/test_eVa7vKcbwbdW1jifYY');
  }
}
