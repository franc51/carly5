import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from '../../admin/services/firebase.service';
import { NumberPlates } from '../../models/number-plates';
import { NumberPlatesService } from '../../admin/services/number-plates.service';
import { ReserveContainerComponent } from '../reserve-container/reserve-container.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

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

  recommendedPlate: string | null = null;

  // variable for getting the user data
  ownerEmail!: string;

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

  // variable for testing user input for the pattern
  result!: boolean;

  // test variable for UI
  hideAvailability!: boolean;

  // variable for showing succes reservation
  plateReservedSuccesfully!: boolean;

  // showing in UI if it's NOT matching pattern
  isNotMatchingPattern!: boolean;

  displayedColumns: string[] = [
    'Nr. înmatriculare',
    'Rezervat în data',
    'Valabil până la data',
  ];

  dataSource: NumberPlates[] = [];

  userInput!: string;
  matchingNumberPlate: string | undefined;

    constructor(
    public http: HttpClient,
    public auth: AuthService,
    private firebaseService: FirebaseService,
    private numberPlateService: NumberPlatesService,
  ) {}

   ngOnInit(): void {
    this.loadPlatesForUser(this.userEmail);
    this.isLoadingResults = false;
    localStorage.removeItem("ReservedPlates");
  }

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
      const reservedNumberPlate: NumberPlates = {
        ...formValue,
        _id: uuidv4(),
        date: new Date(),
        availability: new Date(new Date().setDate(new Date().getDate()+14)),
        ownerEmail: this.userEmail,
      };
      this.reserve.emit(reservedNumberPlate);
      localStorage.setItem("ReservedPlates", JSON.stringify(reservedNumberPlate));
      console.log("OncreateReservation method: " , reservedNumberPlate);
      this.plateReservedSuccesfully = true;
    }
    else {
      this.isNotMatchingPattern = true;
    }
  }

 checkNumberPlate(form: NgForm): void {
  this.isNotMatchingPattern = false;
  this.isRegistered = false;
  this.isReserved = false;
  this.recommendedPlate = null;
  const userInput = form.value.reservedVehicleNumberPlate?.toUpperCase();
  if (!this.isMatchingPattern(userInput)) {
    this.isNotMatchingPattern = true;
    return;
  }
  this.isLoadingResults = true;
  this.numberPlateService.checkNumberPlateExists(userInput).subscribe(
    (reservedPlateExists: boolean) => {
      this.isReserved = reservedPlateExists;
      this.firebaseService.getAdminDashboard().subscribe(
        (vehicles: VehicleRegistration[]) => {
          this.isRegistered = vehicles.some(
            (v) => v.vehicleNumberPlate.toUpperCase() === userInput
          );
          const reservedList = [userInput];
          const registeredList = vehicles.map(v => v.vehicleNumberPlate.toUpperCase());
          if (this.isReserved || this.isRegistered) {
            this.recommendedPlate = this.recommendNextAvailablePlate(userInput, reservedList, registeredList);
          }
          this.isLoadingResults = false;
        },
        (error) => {
          console.error('Error fetching vehicles:', error);
          this.isLoadingResults = false;
        }
      );
    },
    (error) => {
      console.error('Error checking reservation:', error);
      this.isLoadingResults = false;
    }
  );
}


 loadPlatesForUser(userEmail: string): void {
  this.auth.user$.subscribe((user) => {
    if (user) {
      this.isLoadingResults = true;
      this.userEmail = user.email as string;
      if (!this.userEmail) {
        console.error('User email is undefined');
        return;
      }

      this.numberPlateService.getPlates(this.userEmail).subscribe(
        (plates: NumberPlates[]) => {
          if (plates.length === 0) {
            console.error('No number plates found for user:', this.userEmail);
          }

          const currentDate = new Date();

          // Filter expired plates
          const filteredPlates = plates.filter(
            (plate) => new Date(plate.availability) < currentDate
          );

          // Delete expired plates
          filteredPlates.forEach((plate) => {
            this.deletePlateIfExpired(plate);
          });

          // Keep only valid plates and sort by `date` DESCENDING
          this.reservedNumberPlates = plates
            .filter((plate) => !filteredPlates.includes(plate))
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );

          this.dataSource = this.reservedNumberPlates;
          this.isLoadingResults = false;
        },
        (error) => {
          console.error('Error fetching number plates:', error);
          this.isLoadingResults = false;
        }
      );
    }
  });
}

  deletePlateIfExpired(plate: NumberPlates): void {
    const currentDate = new Date();
    if (new Date(plate.availability) < currentDate) {
      // Delete the plate
      this.numberPlateService.deleteReservedNumberPlate(plate._id).subscribe(
        () => {
          console.log('Plate deleted successfully:', plate.reservedVehicleNumberPlate);
        },
        (error) => {
          console.error('Error deleting plate:', error);
        }
      );
    }
  }

  recommendNextAvailablePlate(basePlate: string, reservedList: string[], registeredList: string[]): string | null {
  const pattern = /^([A-Z]{2})(\d{2})([A-Z]{3})$/;
  const match = basePlate.match(pattern);
  if (!match) return null;

  const [_, prefix, numberStr, suffix] = match;
  let number = parseInt(numberStr);

  for (let i = 1; i <= 98; i++) {
    const nextNum = (number + i).toString().padStart(2, '0');
    const nextPlate = `${prefix}${nextNum}${suffix}`;
    if (!reservedList.includes(nextPlate) && !registeredList.includes(nextPlate)) {
      return nextPlate;
    }
  }

  return null;
}

  handleReserveAndCheckout(form: NgForm): void{
  this.onCreateReservation(form);
  this.goToCheckout();
  }
  goToCheckout() {
    window.location.href = 'https://buy.stripe.com/test_eVa7vKcbwbdW1jifYY';
  }
  
}
