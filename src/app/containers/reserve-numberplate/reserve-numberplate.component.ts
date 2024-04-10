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
  plateExists!: boolean;
  vehicles: VehicleRegistration[] = [];
  reservedNumberPlates: NumberPlates[] = [];
  userEmail!: string;
  isLoadingResults = true;
  foundNumberPlate!: boolean;

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
        availability: new Date(),
        reservedBy: 'user',
      };
      form.reset();
      this.reserve.emit(reservedNumberPlate);
      console.log("OncreateReservation method: " , reservedNumberPlate);
    }
  }

  searchNumberPlates(form: NgForm): void {
    const userInput = form.value; // Extracting the value from the HTMLInputElement
    console.log('User Input:', userInput);

    this.isLoadingResults = true;
    this.firebaseService.getAdminDashboard().subscribe(
      (vehicles: VehicleRegistration[]) => {
        console.log('Vehicles:', vehicles);

        if (vehicles && Array.isArray(vehicles)) {
          const filteredVehicles = vehicles.filter(
            (vehicle) => vehicle.vehicleNumberPlate === userInput.reservedNumberPlate
          );
          console.log('Filtered Vehicles:', filteredVehicles);
          this.foundNumberPlate = true;
        } else {
          console.error('Error fetching vehicles: Invalid data format');
        }
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  searchReservedNumberPlate(form: NgForm): void {
    const userInput = form.value.reservedVehicleNumberPlate; // Extract the number plate from the form
    console.log('User Input:', userInput);

    this.isLoadingResults = true;
    this.reservedNumbers.checkNumberPlateExists(userInput).subscribe(
      (plateExists: boolean) => {
        console.log('Plate Exists:', plateExists);
        this.isLoadingResults = false;
        this.foundNumberPlate = plateExists;

        if (plateExists) {
          // Fetch vehicles associated with the found number plates
          this.reservedNumbers.getNumberPlates(userInput).subscribe(
            (reservedNumberPlate: NumberPlates[]) => {
              console.log('reservedNumberPlate:', reservedNumberPlate);

              if (reservedNumberPlate && Array.isArray(reservedNumberPlate)) {
                this.dataSource = reservedNumberPlate;
                console.log("reserved numberplate:", reservedNumberPlate)
              } else {
                console.error('Error fetching vehicles: Invalid data format');
              }
            },
            (error: any) => {
              console.error('Error fetching vehicles:', error);
            }
          );
        }
      },
      (error: any) => {
        console.error('Error checking number plate:', error);
        this.isLoadingResults = false;
      }
    );
  }


  ngOnInit(): void {
    this.isLoadingResults = false;
    this.plateExists = false;
  }
  openLink() {
    window.open('https://buy.stripe.com/test_eVa7vKcbwbdW1jifYY');
  }
}
