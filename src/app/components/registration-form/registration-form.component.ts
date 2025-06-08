import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  Input,
  OnInit,
  OnDestroy,
  EventEmitter,
} from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { v4 as uuidv4 } from 'uuid';

import * as UC from '@uploadcare/file-uploader';
import { OutputFileEntry } from '@uploadcare/blocks';
import { FirebaseService } from '../../admin/services/firebase.service';
import { NumberPlatesService } from '../../admin/services/number-plates.service';
import { MatSnackBar } from '@angular/material/snack-bar';

UC.defineComponents(UC);

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  providers: [DatePipe],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  @Output() create = new EventEmitter<{
    vehicle: VehicleRegistration;
    files: OutputFileEntry<'success'>[];
  }>();

  @Input() vehicle!: VehicleRegistration;

  files: OutputFileEntry<'success'>[] = []; // temporary store urls

  @ViewChild('ctxProvider', { static: true })
  ctxProviderRef!: ElementRef<InstanceType<UC.UploadCtxProvider>>;

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
    private datePipe: DatePipe,
    private firebaseService: FirebaseService,
    private numberPlateService: NumberPlatesService,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.ctxProviderRef.nativeElement.addEventListener(
      'change',
      this.handleChangeEvent
    );

    this.auth.user$.subscribe((user) => {
      this.userEmail = user?.email || '';

      if (this.userEmail) {
       this.numberPlateService.getPlates(this.userEmail).subscribe((plates) => {
        this.reservedPlates = plates; // keep full objects with IDs
this.filteredPlates = this.reservedPlates
  .map(p => p.reservedVehicleNumberPlate.toUpperCase())
  .filter(plate => plate.includes(this.userInput));
});

      }
    });
  }

  ngOnDestroy(): void {
    this.ctxProviderRef.nativeElement.removeEventListener(
      'change',
      this.handleChangeEvent
    );
  }

onCreateVehicle(form: NgForm): void {
  this.formSubmitted = true;

  if (!this.isInputMatchingPattern(this.userInput)) {
    this.isNotMatchingPattern = true;
    this.isRegistered = false;
    this.isReserved = false;
    return;
  }

  this.isNotMatchingPattern = false;

  this.checkPlateStatus(this.userInput, () => {
    if (this.isRegistered) {
      // Plate already registered, block submission
      this.snackBar.open('Numărul este deja înregistrat!', 'Închide', { duration: 5000 });
      return;
    }

    if (this.isReserved) {
      // Plate is reserved, check owner
      this.numberPlateService.checkReservedPlateOwner(this.userInput).subscribe(ownerEmail => {
        if (ownerEmail !== this.userEmail) {
          // Reserved by someone else — block
          this.snackBar.open('Numărul este deja rezervat de altcineva!', 'Închide', { duration: 5000 });
          return;
        } else {
          // Reserved by current user — allow submission and then delete reservation
          this.submitVehicle(form, () => {
            this.deleteReservedPlateByUserInput(this.userInput);
          });
        }
      });
    } else {
      // Not registered or reserved, just submit
      this.submitVehicle(form);
    }
  });
}

// Helper method to delete reserved plate after submission
deleteReservedPlateByUserInput(plate: string): void {
  const reservedPlateId = this.findReservedPlateId(plate);
  if (reservedPlateId) {
    this.numberPlateService.deleteReservedNumberPlate(reservedPlateId).subscribe({
      next: () => {
        this.snackBar.open('Numărul rezervat a fost eliminat din lista rezervărilor.', 'Închide', { duration: 3000 });
        // Update local reserved plates lists
        this.reservedPlates = this.reservedPlates.filter(p => p._id !== reservedPlateId);
        this.filteredPlates = this.reservedPlates
       .map(p => p.reservedVehicleNumberPlate.toUpperCase())
       .filter(plate => plate.includes(this.userInput));
      },
      error: (err) => {
        console.error('Eroare la ștergerea numărului rezervat:', err);
        this.snackBar.open('Ștergerea numărului rezervat a eșuat.', 'Închide', { duration: 3000 });
      }
    });
  }
}


submitVehicle(form: NgForm, callback?: () => void): void {
  const formValue = form.value;

  const newVehicle: VehicleRegistration = {
    ...formValue,
    _id: uuidv4(),
    date: new Date(),
    details: 'Cerere trimisă',
    status: 'În așteptare',
    ownerCNP: 1,
    ownerIdentityCard: this.files[0],
    vehicleYear: 1,
    vehicleIdentityCard: this.files[1],
    certificatePaymentProof: false,
    ownershipProof: this.files[2],
    isAccepted: false,
    vehicleNumberPlate: this.userInput,
  };

  this.create.emit({ vehicle: newVehicle, files: this.files });
  form.resetForm();
  this.isReserved = false;
  this.isRegistered = false;
  this.isNotMatchingPattern = false;
  this.recommendedPlate = null;
  this.filteredPlates = this.reservedPlates.map(p => p.reservedVehicleNumberPlate.toUpperCase());
  this.userInput = '';
  this.snackBar.open('Cerere trimisă cu succes!', 'Închide', {
    duration: 9000,
  });

  if (callback) {
    callback();
  }
}


findReservedPlateId(plate: string): string | null {
  const found = this.reservedPlates.find(
    (p) => p.reservedVehicleNumberPlate.toUpperCase() === plate.toUpperCase()
  );
  return found?._id || null;
}

 onUserInputChange(value: string): void {
  // Force uppercase
  this.userInput = value.toUpperCase();
  // Filter autocomplete list
  this.filteredPlates = this.reservedPlates
    .map(p => p.reservedVehicleNumberPlate.toUpperCase())
    .filter(plate => plate.includes(this.userInput));
}


  isInputMatchingPattern(input: string): boolean {
    const pattern = /^([A-Z]{2}\d{2}[A-Z]{3}|[A-Z]\d{3}[A-Z]{3})$/;
    return pattern.test(input);
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  handleChangeEvent = (event: CustomEvent<any>): void => {
    if (event.type === 'change') {
      this.files = event.detail.allEntries as OutputFileEntry<'success'>[];
    }
    console.log('in method: ', this.files);
  };

checkPlateStatus(userInput: string, callback: () => void): void {
  this.isNotMatchingPattern = !this.isInputMatchingPattern(userInput);
  if (this.isNotMatchingPattern) {
    this.isReserved = false;
    this.isRegistered = false;
    callback();
    return;
  }

  this.isLoading = true;

  // Use new method to get owner email if reserved
  this.numberPlateService.checkReservedPlateOwner(userInput).subscribe(
    (reservedByEmail: string | null) => {
      this.isReserved = reservedByEmail !== null;
      const reservedByUser = reservedByEmail === this.userEmail;

      this.firebaseService.getAdminDashboard().subscribe(
        (vehicles: VehicleRegistration[]) => {
          const registeredPlates = vehicles.map((v) =>
            v.vehicleNumberPlate.toUpperCase()
          );
          this.isRegistered = registeredPlates.includes(userInput.toUpperCase());

          // If plate is registered or reserved by someone else, recommend a new plate
          if (this.isRegistered || (this.isReserved && !reservedByUser)) {
            this.recommendedPlate = this.recommendNextAvailablePlate(
              userInput,
              this.isReserved && !reservedByUser ? [userInput] : [],
              registeredPlates
            );
          } else {
            this.recommendedPlate = null;
          }

          this.isLoading = false;
          callback();
        },
        () => {
          this.isLoading = false;
          callback();
        }
      );
    },
    () => {
      this.isLoading = false;
      callback();
    }
  );
}


  recommendNextAvailablePlate(
    basePlate: string,
    reservedList: string[],
    registeredList: string[]
  ): string | null {
    for (let i = 1; i <= 100; i++) {
      const suggestion =
        basePlate.slice(0, 2) +
        (parseInt(basePlate.slice(2, 4)) + i).toString().padStart(2, '0') +
        basePlate.slice(4);

      if (!reservedList.includes(suggestion) && !registeredList.includes(suggestion)) {
        return suggestion;
      }
    }
    return null;
  }
}
