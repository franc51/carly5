import { Component } from '@angular/core';

@Component({
  selector: 'app-numberplate-check',
  templateUrl: './numberplate-check.component.html',
  styleUrl: './numberplate-check.component.css'
})
export class NumberplateCheckComponent {

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
  }

  result = this.isMatchingPattern(this.userInput);

  searchNumberPlate(numberPlate: String): void {
    if(this.isMatchingPattern){
      console.log(this.isMatchingPattern(this.userInput));
      this.matchingNumberPlate = this.numberPlate.find(
        (item) => item === this.userInput
      );

    }
    if (this.matchingNumberPlate === this.userInput) {
    }
  }
}
