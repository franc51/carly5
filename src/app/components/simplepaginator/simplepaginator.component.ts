import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleRegistration } from '../../model/vehicle-registration';

@Component({
  selector: 'app-simplepaginator',
  templateUrl: './simplepaginator.component.html',
  styleUrl: './simplepaginator.component.css',
})
export class SimplepaginatorComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'Id',
    'Nume',
    'Prenume',
    'Vehicul',
    'Model',
    'Nr. inm.',
    'Data',
    'Detalii',
    'Actiuni',
  ];

  vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];

  dataSource = new MatTableDataSource<VehicleRegistration>(this.vehicles);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
