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
import { v4 as uuidv4 } from 'uuid';
import * as LR from '@uploadcare/blocks';
import { OutputFileEntry } from '@uploadcare/blocks';
import { user } from 'firebase-functions/v1/auth';
import { FirebaseService } from '../../admin/services/firebase.service';

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

  isRegistered = false;

  isLoading!: boolean;

  @Input() vehicle!: VehicleRegistration;

  @Output() files: OutputFileEntry<'success'>[] = []; // temporary store urls

  @ViewChild('ctxProvider', { static: true }) ctxProviderRef!: ElementRef<
    InstanceType<LR.UploadCtxProvider>
  >;

  userInput: any;
  formSubmitted = false;

  constructor(
    private datePipe: DatePipe,
    private firebaseService: FirebaseService
  ) {}

  onCreateVehicle(form: NgForm): void {
    if (form.valid) {
      const formValue = form.value;

      // Ensure all required properties are present
      const newVehicle: VehicleRegistration = {
        ...formValue,
        _id: uuidv4(),
        date: new Date(), // Assign a new Date object
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

      if (this.isInputMatchingPattern(this.userInput)) {
        this.isLoading = true;
        this.isRegistered = false;
        this.firebaseService.vehicleExists(newVehicle).subscribe((exists) => {
          if (!exists) {
            // Vehicle doesn't exist in the database, proceed with creation
            form.reset();
            console.log(' child component : ', this.files);
            this.create.emit({ vehicle: newVehicle, files: this.files });
            this.isLoading = false;
          } else {
            // Vehicle already exists in the database
            console.log('Vehicle already exists in the database');
            this.isRegistered = true;
            this.isLoading = false;
          }
        });
      }
    }
  }
  isInputMatchingPattern(input: string): boolean {
    const pattern = /^[A-Z]{2}\d{2}[A-Z]{3}$/;
    return pattern.test(input);
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }
  ngOnInit(): void {
    this.ctxProviderRef.nativeElement.addEventListener(
      'change',
      this.handleChangeEvent
    );
  }
  ngOnDestroy(): void {
    this.ctxProviderRef.nativeElement.removeEventListener(
      'change',
      this.handleChangeEvent
    );
  }
  handleChangeEvent = (event: CustomEvent<any>): void => {
    if (event.type === 'change') {
      this.files = event.detail.allEntries as OutputFileEntry<'success'>[];
    }
    console.log('in method: ', this.files);
  };
}
