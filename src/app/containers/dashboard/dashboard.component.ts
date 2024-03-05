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
      // User information, including user roles, will be available here
      console.log('User object:', JSON.stringify(user, null, 2));
      // Check if the user has the 'admin' role in user_metadata
      this.isAdmin = user.email_verified === true;
      console.log(this.isAdmin);
    });
  }
}
