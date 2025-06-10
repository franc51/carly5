import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../../model/appointment.model';
import { map, Observable } from 'rxjs';
import { app } from 'firebase-admin';

@Injectable({ providedIn: 'root' })

export class AppointmentService {
  private appointmentUrl = 'https://appointments-e91d1.firebaseio.com';

  constructor(private http: HttpClient) {}

  saveAppointment(service: string, date: string, appointment: Appointment): Observable<any> {
  const url = `${this.appointmentUrl}/${service}/${date}.json`;
  return this.http.post(url, appointment);
}
getAppointmentsByUser(userId: string): Observable<Appointment[]> {
const url = `${this.appointmentUrl}/.json`;
  return this.http.get<{ [service: string]: { [date: string]: { [key: string]: Appointment }}}>(url).pipe(
    map(allData => {
      const appointments: Appointment[] = [];
      if (!allData) return appointments;
      Object.values(allData).forEach(serviceGroup => {
        Object.values(serviceGroup).forEach(dateGroup => {
          Object.values(dateGroup).forEach((appointment: Appointment) => {
            if (appointment.userId === userId) {
              appointments.push(appointment);
            }
          });
        });
      });
      console.log(appointments);
      return appointments;
    })
  );
}

    
  getBookedTimes(date: string, service: string): Observable<string[]> {
    const url = `${this.appointmentUrl}/${service}/${date}.json`;
    return this.http.get<any>(url).pipe(
      map((appointmentsObj) => {
        if (!appointmentsObj) return [];
        return Object.values(appointmentsObj).map((appointment: any) => appointment.time);
      })
    );
  }

}
