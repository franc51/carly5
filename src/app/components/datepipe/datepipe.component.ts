import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-datepipe',
  templateUrl: './datepipe.component.html',
  styleUrl: './datepipe.component.css'
})
export class DatepipeComponent {
  constructor(private datePipe: DatePipe) { }
  currentDateAndTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

}
