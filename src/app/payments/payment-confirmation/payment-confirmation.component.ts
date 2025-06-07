import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrl: './payment-confirmation.component.css'
})
export class PaymentConfirmationComponent {
 plate: any;

  ngOnInit(): void {
    this.plate = JSON.parse(localStorage.getItem("ReservedPlates") || '{}');
    console.log('Reserved plate from localStorage:', this.plate);
  }
}
