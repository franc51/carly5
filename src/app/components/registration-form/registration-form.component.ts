import { Component, ViewChild, ElementRef, Output, Input, OnInit, OnDestroy ,EventEmitter} from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import * as LR from '@uploadcare/blocks';
import { OutputFileEntry } from '@uploadcare/blocks';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  providers: [DatePipe],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  @Output() create = new EventEmitter<{ vehicle: VehicleRegistration, files: OutputFileEntry<'success'>[] }>();


  @Input() vehicle!: VehicleRegistration;

  @Output() files: OutputFileEntry<'success'>[] = []; // temporary store urls

@ViewChild('ctxProvider', { static: true }) ctxProviderRef!: ElementRef<
InstanceType<LR.UploadCtxProvider>
>;

  userInput: any;
  formSubmitted = false;

  constructor(private datePipe: DatePipe) {}

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
        ownerIdentityCard: 's',
        vehicleYear: 1,
        vehicleIdentityCard: this.files[0],
        certificatePaymentProof: false,
        ownershipProof: this.files[1],
        isAccepted: false,
        vehicleNumberPlate: this.userInput,
      };
      console.log(this.files[0]);
      form.reset();
      this.create.emit({ vehicle: newVehicle, files: this.files });
    }
  }

  isInputMatchingPattern(input: string): boolean {
    // Define your pattern matching logic here
    const pattern = /^[A-Z]{2}\d{2}[A-Z]{3}$/;
    return pattern.test(input);
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || ''; // Adjust format as per your requirement
  }
  ngOnInit(): void {
    this.ctxProviderRef.nativeElement.addEventListener(
      'change',
      this.handleChangeEvent,
    );
  }
  ngOnDestroy(): void {
    this.ctxProviderRef.nativeElement.removeEventListener(
      'change',
      this.handleChangeEvent,
    );
  }
  handleChangeEvent = (event: LR.EventMap['change']): void => {
    this.files = event.detail.allEntries.filter((file) => file.status === 'success') as OutputFileEntry<'success'>[];
  };
}
