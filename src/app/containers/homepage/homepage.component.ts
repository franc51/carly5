import { Component, HostListener, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  constructor(public auth: AuthService) {}
  loaded: any;
  events: string[] = [];
  opened: boolean = true;
  isMobile: boolean = false;

ngOnInit() {
  this.isMobile = window.innerWidth <= 768;
}
  @ViewChild('sidenav') sidenav!: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    this.opened = !this.isMobile;
  }

}
