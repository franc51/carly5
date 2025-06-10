import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NumberPlates } from '../../models/number-plates';
import { NumberPlatesService } from '../../admin/services/number-plates.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogRadiationComponent } from '../dialog-radiation/dialog-radiation.component';
import { FirebaseService } from '../../admin/services/firebase.service';
import { User } from '../../model/users.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  vehicles: VehicleRegistration[] = [];
  reservedNumberPlates: NumberPlates[] = [];
  isLoadingVehicles = true;
  isLoadingPlates = true;
  userId!: string;
  userEmail!: string;

  dataSource: VehicleRegistration[] = [];

  constructor(
    public http: HttpClient,
    public auth: AuthService,
    private numberPlateService: NumberPlatesService,
    private router: Router,
    private firebaseService: FirebaseService,
    private snackBar: MatSnackBar,
  ) {}

  get isLoadingResults(): boolean {
  return this.isLoadingVehicles || this.isLoadingPlates;
}

userProfile: User = {
  firstName: '',
  lastName: '',
  email: '',
  phone: 0,
  password: '',
};

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user?.email && user?.sub) {
        this.userId = user.sub;
        this.userEmail = user.email;
        this.userProfile.email = user.email;
        console.log(this.userEmail);
        // Preia profilul dacă există
        this.firebaseService.getUserProfile(this.userId).subscribe({
          next: (profile) => {
            if (profile) this.userProfile = profile;
          },
          error: (err) => console.error('Eroare la profil:', err),
        });

        // Încarcă mașinile și plăcuțele rezervate
        this.loadRegisteredVehiclesForUser();
        this.loadPlatesForUser();
      }
    });
  }

  saveUserProfile(): void {
    if (!this.userId) return;
    this.firebaseService.saveUserProfile(this.userId, this.userProfile).subscribe({
      next: () => console.log('Profil salvat cu succes!'),
      error: (err) => console.error('Eroare la salvare:', err),
    });
  }

  loadRegisteredVehiclesForUser() {
    this.isLoadingVehicles = true;
    this.auth.user$.subscribe(user => {
      if (user && user.email) {
        this.userEmail = user.email;
        this.http.get<{ [key: string]: VehicleRegistration }>('https://vehicles-9f2ad.firebaseio.com/vehicles.json').subscribe(
          (vehiclesData) => {
            const vehiclesArray: VehicleRegistration[] = Object.values(vehiclesData);
            this.vehicles = vehiclesArray.filter(
              (vehicle) => vehicle.ownerEmail === this.userEmail && vehicle.status === 'Aprobat'
            );
            this.vehicles.reverse();
            this.dataSource = this.vehicles;
            this.isLoadingVehicles = false;
          },
          (error) => {
            console.error('Error fetching vehicles:', error);
            this.isLoadingVehicles = false;
          }
          
        );
        this.isLoadingVehicles = false;
      }
    });
  }

  loadPlatesForUser() {
    this.isLoadingPlates = true;
    this.auth.user$.subscribe(user => {
      if (user && user.email) {
        this.userEmail = user.email;
        this.numberPlateService.getPlates(this.userEmail).subscribe(plates => {
          const currentDate = new Date();

          // Delete expired plates
          plates.forEach(plate => {
            if (new Date(plate.availability) < currentDate) {
              this.numberPlateService.deleteReservedNumberPlate(plate._id).subscribe({
                next: () => console.log('Deleted expired plate:', plate.reservedVehicleNumberPlate),
                error: err => console.error('Failed to delete expired plate:', err)
              });
            }
          });

          // Filter out expired plates after deletion check
          this.reservedNumberPlates = plates.filter(
            plate => new Date(plate.availability) >= currentDate
          ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          this.isLoadingPlates = false;

        }, error => {
          console.error('Error fetching number plates:', error);
          this.isLoadingPlates = false;
        });
      }
    });
  }

   readonly dialog = inject(MatDialog);

openRadiationDialog(vehicle: VehicleRegistration): void {
  const dialogRef = this.dialog.open(DialogRadiationComponent, {
    width: '350px',
    data: { vehicle: vehicle.vehicleNumberPlate },
    enterAnimationDuration: '300ms',
    exitAnimationDuration: '200ms',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.deleteVehicleRegistration(vehicle); // logică efectivă de ștergere
    }
  });
}

deleteVehicleRegistration(vehicle: VehicleRegistration): void {
  // exemplu pentru Firebase Realtime DB
  const url = `https://vehicles-9f2ad.firebaseio.com/vehicles/${vehicle._id}.json`;
  this.http.delete(url).subscribe({
    next: () => {
      console.log('Vehicul radiat:', vehicle.vehicleNumberPlate);
      this.vehicles = this.vehicles.filter(v => v._id !== vehicle._id);
      this.dataSource = [...this.vehicles];
    },
    error: err => console.error('Eroare la radiere:', err),
  });
}

}