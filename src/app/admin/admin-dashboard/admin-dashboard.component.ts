import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '@auth0/auth0-angular';
import { ImageGalleryComponent } from '../../components/image-gallery/image-gallery.component';
import { Router } from '@angular/router';
import { NumberPlatesService } from '../services/number-plates.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import emailjs from "@emailjs/browser";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  vehicles: VehicleRegistration[] = [];
  dataSource: VehicleRegistration[] = [];
  isLoadingResults = true;
  radiations: VehicleRegistration[] = [];

  userInput: string = '';
  formSubmitted = false;
  isRegistered = false;
  isReserved = false;
  isNotMatchingPattern = false;
  recommendedPlate: string | null = null;
  isLoading = false;
  userEmail: string = '';
  reservedPlates: { _id: string; reservedVehicleNumberPlate: string }[] = [];

  filteredPlates: string[] = [];

  constructor(
    private firebaseService: FirebaseService,
    public auth: AuthService,
    private router: Router,
    private numberPlateService: NumberPlatesService,
    private snackBar: MatSnackBar,
  ) {}

  @Output() update = new EventEmitter<VehicleRegistration>();
  @Output() delete = new EventEmitter<VehicleRegistration>();

  selectedVehicle: VehicleRegistration | null = null;

  trackById(index: number, value: VehicleRegistration) {}

  displayedColumns: string[] = [
    'ownerName',
    'ownerSurname',
    'ownerPhone',
    'vehicleManufacturer',
    'vehicleModel',
    'numberPlate',
    'date',
    'details',
    'inm/rad',
  ];

 ngOnInit(): void {
  this.loadVehicles();

  this.numberPlateService.getAllReservedNumberPlates().subscribe(plates => {
    this.reservedPlates = plates;
    this.filteredPlates = this.reservedPlates.map(p => p.reservedVehicleNumberPlate);
  });
}


  onViewImages(vehicle: VehicleRegistration): void {
    const imageUrlsToShow: string[] = [
      vehicle.ownerIdentityCard,
      vehicle.vehicleIdentityCard,
      vehicle.ownershipProof,
    ];

    // Filter out empty or undefined URLs
    const validImageUrls = imageUrlsToShow.filter((url) => url);

    if (validImageUrls.length > 0) {
      this.router.navigate(['/admin/image-gallery'], { state: { images: validImageUrls } });
    }
  }


  loadVehicles(): void {
    this.firebaseService.getAdminDashboard().subscribe(
      (vehicles: VehicleRegistration[] | null) => {
        if (vehicles && Array.isArray(vehicles)) {
          this.vehicles = vehicles.reverse();
          this.isLoadingResults = true;
          // Filter vehicles where details property is "Cerere trimisa"
          const filteredVehicles = vehicles.filter(
            (vehicle) => vehicle.details === 'Cerere trimisă'
          );
          this.vehicles = filteredVehicles;
          this.dataSource = filteredVehicles;
          this.isLoadingResults = false;
        } else {
          console.error('Error fetching vehicles: Invalid data format');
          this.isLoadingResults = false;
        }
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
        this.isLoadingResults = false;
      }
    );
    this.isLoadingResults = false;
  }


  onRejectVehicle(form: NgForm, updatedVehicle: VehicleRegistration): void {
    updatedVehicle.status = 'Respins';

    this.firebaseService.updateVehicle(updatedVehicle._id, updatedVehicle).subscribe(
      (response: VehicleRegistration) => {
        const index = this.vehicles.findIndex((vehicle) => vehicle._id === response._id);
        if (index !== -1) {
          this.vehicles[index] = response;
          this.dataSource = [...this.vehicles];
        }
      },
      (error) => {
        console.error('Error updating vehicle:', error);
      }
    );
  }

onApproveVehicle(form: NgForm, updatedVehicle: VehicleRegistration): void {
  updatedVehicle.status = 'Aprobat';
  updatedVehicle.details = 'Înmatriculare aprobată';

  this.firebaseService.updateVehicle(updatedVehicle._id, updatedVehicle).subscribe(
    (response: VehicleRegistration) => {
      console.log('Vehicle update response:', response);

      const index = this.vehicles.findIndex((vehicle) => vehicle._id === response._id);
      if (index !== -1) {
        this.vehicles.splice(index, 1);
        this.dataSource = [...this.vehicles];

        

        // Ștergem rezervarea aferentă numărului aprobat
        if(this.reservedPlates.some(p => p.reservedVehicleNumberPlate === response.vehicleNumberPlate)){
        this.deleteReservedPlateByUserInput(response.vehicleNumberPlate);
        }
    this.snackBar.open('Înmatriculare aprobată', 'Închide', { duration: 9000 });
    

    const templateParams = {
      email: updatedVehicle.ownerEmail,
      owner_name: updatedVehicle.ownerName,
      owner_surname: updatedVehicle.ownerSurname,
      vehicle_manufacturer: updatedVehicle.vehicleManufacturer,
      vehicle_model: updatedVehicle.vehicleModel,
      vin: updatedVehicle.vehicleVinNumber,
      number_plate: updatedVehicle.vehicleNumberPlate,
    };
    emailjs
    .send(
      'service_1xewkt5',      
      'template_vfzk977',     
      templateParams,
      'KSKcnRkzisR40rcif'
    )
    .then(
      (response) => {
        console.log('Email sent successfully!', response.status, response.text);
      },
      (error) => {
        console.error('Email sending failed!', error);
      }
    );
      }
    },
    (error) => {
      console.error('Error updating vehicle:', error);
    }
  );
}

// Helper method to delete reserved plate after submission
deleteReservedPlateByUserInput(plate: string): void {
  const reservedPlateId = this.findReservedPlateId(plate);
  console.log(`Finding reserved plate ID for "${plate}":`, reservedPlateId);

  if (reservedPlateId) {
    this.numberPlateService.deleteReservedNumberPlate(reservedPlateId).subscribe({
      next: () => {
        console.log('Reserved plate deleted successfully:', reservedPlateId);
        this.snackBar.open('Înmatriculare aprobată', 'Închide', { duration: 9000 });

        this.reservedPlates = this.reservedPlates.filter(p => p._id !== reservedPlateId);

        const userInputUpper = this.userInput.toUpperCase();
        this.filteredPlates = this.reservedPlates
          .map(p => p.reservedVehicleNumberPlate)
          .filter(p => p.includes(userInputUpper));
      },
      error: (err) => {
        console.error('Eroare la ștergerea numărului rezervat:', err);

        if (err.status === 404) {
          this.snackBar.open('Numărul rezervat a fost deja eliminat.', 'Închide', { duration: 9000 });
          this.reservedPlates = this.reservedPlates.filter(p => p._id !== reservedPlateId);

          const userInputUpper = this.userInput.toUpperCase();
          this.filteredPlates = this.reservedPlates
            .map(p => p.reservedVehicleNumberPlate)
            .filter(p => p.includes(userInputUpper));
          return;
        }

        this.snackBar.open('Ștergerea numărului rezervat a eșuat.', 'Închide', { duration: 9000 });
      }
    });
  } else {
    this.snackBar.open('Numărul rezervat nu a fost găsit.', 'Închide', { duration: 9000 });
  }
}

findReservedPlateId(plate: string): string | null {
  console.log('Searching reserved plate ID for:', plate);
  const plateUpper = plate.toUpperCase();
  const found = this.reservedPlates.find(
    (p) => p.reservedVehicleNumberPlate === plateUpper
  );
  console.log('Found reserved plate:', found);
  return found?._id || null;
}


}
