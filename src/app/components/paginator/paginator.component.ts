import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { VehicleRegistration } from '../../model/vehicle-registration';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements AfterViewInit {
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  data: VehicleRegistration[] = [];
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    this._httpClient
      .get<VehicleRegistration[]>('http://localhost:4200/api/vehicles')
      .pipe(
        map((vehicles: VehicleRegistration[]) => {
          console.log('Data from API:', vehicles); // Log the data to console for debugging
          this.resultsLength = vehicles.length;
          return vehicles;
        }),
        catchError((error) => {
          console.error('Error loading data:', error);
          this.isLoadingResults = false;
          return []; // Return an empty array in case of error
        })
      )
      .subscribe((data) => {
        this.isLoadingResults = false;
        this.data = data;
      });
  }
}
