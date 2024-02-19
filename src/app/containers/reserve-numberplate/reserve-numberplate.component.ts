import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-reserve-numberplate',
  templateUrl: './reserve-numberplate.component.html',
  styleUrl: './reserve-numberplate.component.css',
})
export class ReserveNumberplateComponent {
  constructor(public auth: AuthService) {}

  // these are test arrays
  // will be replace with an API service

  reservedNumberPlate: string[] = ['HD55AFC', 'BV15ABC'];

  numberPlate: string[] = [
    'BV15ABC',
    'MM64FHS',
    'BV29XYZ',
    'BV73ABC',
    'BV56LMN',
    'BV84PQR',
    'BV12DEF',
    'BV48GHI',
    'BV65JKL',
    'BV37MNO',
    'BV91STU',
    'BV18VWX',
    'BV42YZA',
    'BV79BCD',
    'BV53EFG',
    'BV28HIJ',
    'BV94KLM',
    'BV61NOP',
    'BV73QRS',
    'BV89TUV',
    'BV15WXY',
    'BV46ZAB',
  ];

  userInput: string = '';
  matchingNumberPlate: string | undefined;

  isMatchingPattern = (userInput: string): boolean => {
    const pattern = /^[A-Z]{2}\d{2}[A-Z]{3}$/;
    return pattern.test(userInput);
  };

  result = this.isMatchingPattern(this.userInput);

  searchNumberPlate(reservedNumberPlate: String): void {
    if (this.isMatchingPattern) {
      console.log(this.isMatchingPattern(this.userInput));
      this.matchingNumberPlate = this.reservedNumberPlate.find(
        (item) => item === this.userInput
      );
      this.reservedNumberPlate.push(this.userInput);
      console.log(reservedNumberPlate);
    }
    if (this.matchingNumberPlate === this.userInput) {
    }
  }
}
