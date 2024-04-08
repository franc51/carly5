import { Component, Input } from '@angular/core';
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
  reservationSuccesful!: boolean;
  reservation: any;
  constructor(private numberPlateService: NumberPlatesService) {}

  userInput = '';

  reservedNumberPlate: NumberPlates = {
    _id: uuidv4(), // Generate UUID for _id
    date: new Date(),
    reservedVehicleNumberPlate: this.userInput,
    availability: new Date(),
    reservedBy: 'string',
  };
  onCreateReservedNumberPlate(reservedNumberPlate: NumberPlates): void {
    // Check if the same number plate already exists
    this.numberPlateService.checkNumberPlateExists(reservedNumberPlate.reservedVehicleNumberPlate)
      .subscribe(
        (exists: boolean) => {
          if (exists) {
            this.reservationSuccesful = false;
            console.error('Error: Number plate already exists', exists);
            // Handle error: Number plate already exists
          } else {
            this.reservationSuccesful = true;
            // Number plate does not exist, proceed to create reservation
            this.numberPlateService.createReservedNumberPlate(reservedNumberPlate)
              .subscribe(
                (createdReservation: NumberPlates) => {
                  console.log('Reservation successful:', createdReservation);
                  this.reservationSuccesful = false;
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
