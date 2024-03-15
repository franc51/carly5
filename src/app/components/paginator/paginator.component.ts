import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { VehicleRegistration } from '../../model/vehicle-registration';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements AfterViewInit {
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  exampleDatabase!: ExampleHttpDatabase;
  data: VehicleRegistration[] = [];
  vehicles!: VehicleRegistration[];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getData(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (!data) {
            // Handle the case when null is emitted
            return [];
          }

          // Assuming your data structure has a property 'total' to represent the total count
          this.resultsLength = data.total;
          return data.items;
        })
      )
      .subscribe((data) => (this.data = data || [])); // Ensure data is not null
  }
}

export interface VehicleRegistrationResponse {
  items: VehicleRegistration[];
  total: number;
}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getData(
    sort: string,
    order: SortDirection,
    page: number
  ): Observable<VehicleRegistrationResponse> {
    // Replace this with your actual URL to fetch data
    const source = 'http://localhost:4200/api/vehicles';

    return this._httpClient.get<VehicleRegistration[]>(source).pipe(
      map((vehicles: VehicleRegistration[]) => {
        const total = vehicles.length; // Assuming the length of the array represents the total count
        return { items: vehicles, total: total };
      }),
      catchError((error) => {
        console.error('Error loading data:', error);
        return observableOf({ items: [], total: 0 }); // Return an empty response in case of error
      })
    );
  }
}
