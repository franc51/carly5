import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isAdmin: boolean = false;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user: any) => {
      this.isAdmin = user.email_verified === true;
    });
  }
  openBookingPage() {
    // Open the booking link in a new tab
    window.open('https://book.timekit.io/carly-itp', '_blank');
  }
}
