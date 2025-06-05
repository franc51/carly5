import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
cars = [
  {
    brand: 'Volkswagen',
    model: 'GOLF',
    plate: 'B-123-ABC',
    vin: '1234567890',
    year: 2015,
    status: 'Înmatriculat'
  },
  {
    brand: 'Dacia',
    model: 'DUSTER',
    plate: 'CJ-99-XYZ',
    vin: '9876543210',
    year: 2020,
    status: 'Înmatriculat'
  }
];

}
