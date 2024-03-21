import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
    measurementId: 'YOUR_MEASUREMENT_ID'
  };

  private firebaseApp!: FirebaseApp;
  private analytics!: Analytics;

  constructor() {
    this.initializeFirebaseApp();
  }

  private initializeFirebaseApp(): void {
    this.firebaseApp = initializeApp(this.firebaseConfig); // Use this.firebaseConfig here
    this.analytics = getAnalytics(this.firebaseApp);
  }

  getFirebaseApp(): FirebaseApp {
    return this.firebaseApp;
  }

  getAnalytics(): Analytics {
    return this.analytics;
  }
}
