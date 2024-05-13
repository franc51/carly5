import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from '../../admin/services/firebase.service';
import { NumberPlates } from '../../model/number-plates';
import { NumberPlatesService } from '../../admin/services/number-plates.service';

@Component({
  selector: 'app-reserve-container',
  templateUrl: './reserve-container.component.html',
  styleUrl: './reserve-container.component.css',
})
export class ReserveContainerComponent {
  reservationExists!: boolean;
  reservationSucces!: boolean;

  ownerEmail!: string;

  constructor(private numberPlateService: NumberPlatesService) {}

  userInput = '';

  reservedNumberPlate: NumberPlates = {
    _id: uuidv4(), // Generate UUID for _id
    date: new Date(),
    reservedVehicleNumberPlate: this.userInput,
    availability: new Date(),
    ownerEmail: this.ownerEmail,
  };

  onCreateReservedNumberPlate(reservedNumberPlate: NumberPlates): void {
    // Check if the same number plate already exists
    this.numberPlateService.checkNumberPlateExists(reservedNumberPlate.reservedVehicleNumberPlate)
      .subscribe(
        (exists: boolean) => {
          if (exists) {
            this.reservationExists = true;
            console.error('Error: Number plate already exists', exists);
            // Handle error: Number plate already exists
          } else {
            // Number plate does not exist, proceed to create reservation
            this.numberPlateService.createReservedNumberPlate(reservedNumberPlate)
              .subscribe(
                (createdReservation: NumberPlates) => {
                  console.log('Reservation successful:', createdReservation);
                  this.reservationSucces = true;
                  // Handle the created reservation
                },
                (error) => {
                  console.error('Error reserving number plate:', error);
                  // Handle error
                }
              );
          }
        },
        (error: any) => {
          console.error('Error checking number plate existence:', error);
          // Handle error
        }
      );
  }

}
