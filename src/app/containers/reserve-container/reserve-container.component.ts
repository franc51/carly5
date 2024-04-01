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
  constructor(private numberPlateService: NumberPlatesService) {}
  userInput!: string;

  reservedNumberPlate: NumberPlates = {
    _id: uuidv4(), // Generate UUID for _id
    date: new Date(),
    reservedVehicleNumberPlate: this.userInput,
    availability: new Date(),
    reservedBy: 'string',
  };

  onCreateReservedNumberPlate(reservedNumberPlate: NumberPlates): void {
    console.log('helo');
    this.numberPlateService
      .createReservedNumberPlate(reservedNumberPlate)
      .subscribe(
        (createdReservation: NumberPlates) => {
          console.log('reservation succes:', createdReservation);
          // Handle the created reservation
        },
        (error) => {
          console.error('Error reservating nr:', error);
          // Handle error
        }
      );
  }
}
