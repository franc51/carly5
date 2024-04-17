import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '@auth0/auth0-angular';
import { ImageGalleryComponent } from '../../components/image-gallery/image-gallery.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  vehicles: VehicleRegistration[] = [];
  dataSource: VehicleRegistration[] = [];
  isLoadingResults = true;

  constructor(
    private firebaseService: FirebaseService,
    public auth: AuthService,
    private router: Router
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
  ];

  ngOnInit(): void {
    this.loadVehicles();
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
          // Filter vehicles where details property is "Cerere trimisa"
          const filteredVehicles = vehicles.filter(
            (vehicle) => vehicle.details === 'Cerere trimisă'
          );
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

  onRejectVehicle(form: NgForm, updatedVehicle: VehicleRegistration): void {
    updatedVehicle.status = 'Respins';

    this.firebaseService.updateVehicle(updatedVehicle._id, updatedVehicle).subscribe(
      (response: VehicleRegistration) => {
        const index = this.vehicles.findIndex((vehicle) => vehicle._id === response._id);
        if (index !== -1) {
          this.vehicles[index] = response;
          this.dataSource = [...this.vehicles];
          location.reload();
        }
      },
      (error) => {
        console.error('Error updating vehicle:', error);
      }
    );
  }

  onApproveVehicle(form: NgForm, updatedVehicle: VehicleRegistration): void {
    updatedVehicle.status = 'Aprobat';
    updatedVehicle.details = 'Certif. de înm, și nr. de înm. au fost trimise la adr. din CI';

    this.firebaseService.updateVehicle(updatedVehicle._id, updatedVehicle).subscribe(
      (response: VehicleRegistration) => {
        const index = this.vehicles.findIndex((vehicle) => vehicle._id === response._id);
        if (index !== -1) {
          this.vehicles.reverse();
          this.vehicles[index] = response;
          this.dataSource = [...this.vehicles];
          location.reload();
        }
      },
      (error) => {
        console.error('Error updating vehicle:', error);
      }
    );
  }
}
