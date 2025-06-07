import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-succes',
  templateUrl: './payment-succes.component.html',
  styleUrl: './payment-succes.component.css'
})
export class PaymentSuccesComponent {
  plate: any;

  ngOnInit(): void {
    this.plate = JSON.parse(localStorage.getItem("ReservedPlates") || '{}');
    console.log('Reserved plate from localStorage:', this.plate);
  }
}
