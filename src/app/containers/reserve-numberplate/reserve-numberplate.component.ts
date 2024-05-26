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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reserve-numberplate',
  templateUrl: './reserve-numberplate.component.html',
  styleUrl: './reserve-numberplate.component.css',
  providers: [DatePipe]
})
export class ReserveNumberplateComponent implements OnInit {
  @Output() reserve = new EventEmitter<NumberPlates>();
  @Input() reservationExists!: boolean;

  vehicles: VehicleRegistration[] = [];
  reservedNumberPlates: NumberPlates[] = [];

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

  constructor(
    public http: HttpClient,
    public auth: AuthService,
    private firebaseService: FirebaseService,
    private numberPlateService: NumberPlatesService,
    private datePipe: DatePipe
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
      const reservedNumberPlate: NumberPlates = {
        ...formValue,
        _id: uuidv4(),
        date: new Date(),
        availability: new Date(new Date().setDate(new Date().getDate()+14)),
        ownerEmail: this.userEmail,
      };
      this.reserve.emit(reservedNumberPlate);
      console.log("OncreateReservation method: " , reservedNumberPlate);
      this.plateReservedSuccesfully = true;
    }
    else {
      this.isNotMatchingPattern = true;
    }
  }

  searchNumberPlates(form: NgForm): void {
    const userInput = form.value.reservedVehicleNumberPlate;
    // Extract the number plate from the form
   if(this.isMatchingPattern(userInput)){
    this.isLoadingResults = true;
    this.firebaseService.getAdminDashboard().subscribe(
      (vehicles: VehicleRegistration[]) => {
        console.log('Vehicles:', vehicles);
        if (vehicles && Array.isArray(vehicles)) {
          const plateExists = vehicles.some(
            (vehicle) => vehicle.vehicleNumberPlate === userInput
          );
          this.isRegistered = plateExists;
          console.log("registered: ",this.isRegistered);
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
    this.numberPlateService.checkNumberPlateExists(userInput).subscribe(
      (reservedPlateExists: boolean) => {
        console.log('reservedPlateExists:', reservedPlateExists);
        this.isLoadingResults = false;
        this.isReserved = reservedPlateExists;
        console.log("matching: ",this.isNotMatchingPattern);
        console.log("reserved: ",this.isReserved);

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
    this.loadPlatesForUser(this.userEmail);
    this.isLoadingResults = false;
  }

  loadPlatesForUser(userEmail: string): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
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
            // Filter out plates with availability date same as present
            const currentDate = new Date()
            const filteredPlates = plates.filter((plate) => new Date(plate.availability) < currentDate);
            // Delete filtered plates
            filteredPlates.forEach((plate) => {
              console.log(plates);
              this.deletePlateIfExpired(plate);
            });
            // Update dataSource with remaining plates
            this.reservedNumberPlates = plates.filter((plate) => !filteredPlates.includes(plate));
            this.dataSource = this.reservedNumberPlates;
          },
          (error) => {
            console.error('Error fetching number plates:', error);
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

  openLink() {
    window.open('https://buy.stripe.com/test_eVa7vKcbwbdW1jifYY');
  }
}
