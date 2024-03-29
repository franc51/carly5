import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from '../../admin/services/firebase.service';

@Component({
  selector: 'app-reserve-numberplate',
  templateUrl: './reserve-numberplate.component.html',
  styleUrl: './reserve-numberplate.component.css',
})
export class ReserveNumberplateComponent {
  @Output() create = new EventEmitter<VehicleRegistration>();
  vehicles: VehicleRegistration[] = [];
  userEmail!: string;
  isLoadingResults = true;

  constructor(
    public auth: AuthService,
    private firebaseService: FirebaseService
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

  onCreateReservedNumberPlate(form: NgForm): void {
    if (form.valid && form.submitted) {
      const formValue = form.value;

      // Ensure all required properties are present
      const newVehicle: VehicleRegistration = {
        ...formValue,
        _id: uuidv4(),
        date: new Date(), // Assign a new Date object
        vehicleNumberPlate: this.userInput,
        availability: 'soon',
      };
      this.create.emit(newVehicle);
      console.log(newVehicle);
      form.reset();
    }
  }

  searchNumberPlates(userInput: string): void {
    const foundVehicle = this.dataSource.find((vehicle) =>
      vehicle.vehicleNumberPlate.includes(this.userInput)
    );
    if (foundVehicle) {
      this.matchingNumberPlate = foundVehicle.vehicleNumberPlate;
      console.log(this.userInput);
      console.log(this.matchingNumberPlate);
    }
  }
  openLink() {
    window.open('https://buy.stripe.com/test_eVa7vKcbwbdW1jifYY');
  }
  ngOnInit(): void {
    // Subscribe to Auth0's user$ observable to get user information
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userEmail = user.email as string; // Get the logged-in user's email
        // Call the method from the VehicleService instance
        this.firebaseService.getAllVehicles(this.userEmail).subscribe(
          (vehicles: VehicleRegistration[]) => {
            // Filter vehicles to render only the ones belonging to the logged-in user
            this.vehicles = vehicles.filter(
              (vehicle) => vehicle.ownerEmail === this.userEmail
            );

            // Reverse the order of fetched vehicles
            this.vehicles.reverse();

            // Assign fetched vehicles to the dataSource
            this.dataSource = this.vehicles;
            console.log(this.userEmail);
            this.isLoadingResults = false;
          },
          (error) => {
            console.error('Error fetching vehicles:', error);
          }
        );
      }
    });
  }
}
