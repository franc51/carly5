import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AppointmentService } from '../../admin/services/appointment.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Appointment } from '../../model/appointment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-technical-appointment',
  templateUrl: './technical-appointment.component.html',
  styleUrl: './technical-appointment.component.css'
})
export class TechnicalAppointmentComponent implements OnInit {
  userId: string = '';
  selectedService = '';
  selectedDate: Date | null = null;
  selectedTime = '';
  availableTimes: string[] = [];
  userAppointments: Appointment[] = [];

  isLoading: boolean = false;

  allTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

  companies = [
  'AutoService Marian',
  'CarCare Plus',
  'DriveSafe Brașov',
  'MotorCheck La Ionuț',
  'SpeedyRepair Brașov'
];
selectedCompany = '';

  constructor(
    private auth: AuthService,
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
  ) {}

 ngOnInit(): void {
  this.isLoading = true;
  this.auth.user$.subscribe(user => {
    this.userId = user?.sub || '';
    if (this.userId) {
      this.appointmentService.getAppointmentsByUser(this.userId).subscribe(appts => {
        this.userAppointments = appts;
        console.log('User appointments loaded:', appts);
         this.isLoading = false;
      });
    }
  });
}


onDateOrServiceChange() {
  if (this.selectedService && this.selectedDate) {
    const dateStr = this.formatDate(this.selectedDate); // Format to 'YYYY-MM-DD'

    this.appointmentService.getBookedTimes(dateStr, this.selectedService).subscribe((bookedTimes: string[]) => {
      this.availableTimes = this.allTimes.filter(time => !bookedTimes.includes(time));
    });
  }
}

formatDate(date: Date): string {
  return date.toISOString().split('T')[0]; // e.g., "2025-06-11"
}

 onSubmit(form: NgForm) {
  if (form.valid && this.userId) {
    const { service, date, time } = form.value;

    const formattedDate = this.formatDate(date);
    
    const appointment: Appointment = {
      userId: this.userId,
      service,
      date: this.formatDate(this.selectedDate!),     
      time: this.selectedTime,
      company: this.selectedCompany,
    };

    this.appointmentService
      .saveAppointment(this.selectedService, appointment.date, appointment)
      .subscribe(() => {
        this.snackBar.open('Programare efectuată cu succes!', 'Închide', { duration: 9000 });
        form.resetForm();
        this.availableTimes = [];
      });
  }
}

}