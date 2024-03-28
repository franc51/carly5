import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { VehicleRegistration } from '../../model/vehicle-registration';
import { NgForm } from '@angular/forms';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { firestore } from 'firebase-admin';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrl: './admin-container.component.css',
})
export class AdminContainerComponent {
  @Input() vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];
  @Output() update = new EventEmitter<VehicleRegistration>();

  onUpdate(vehicle: VehicleRegistration) {
    this.firebaseService.updateVehicle(vehicle._id, vehicle);
  }
  constructor(private firebaseService: FirebaseService) {}
}
