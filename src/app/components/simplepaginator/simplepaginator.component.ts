import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleRegistration } from '../../model/vehicle-registration';

@Component({
  selector: 'app-simplepaginator',
  templateUrl: './simplepaginator.component.html',
  styleUrl: './simplepaginator.component.css'
})
export class SimplepaginatorComponent implements AfterViewInit {
  displayedColumns: string[] = ['Id', 'Nume', 'Prenume', 'Vehicul', 'Model', 'Nr. inm.', 'Data', 'Detalii', 'Actiuni'];

  vehicle!: VehicleRegistration;
  vehicles!: VehicleRegistration[];

  dataSource = new MatTableDataSource<VehicleRegistration>(this.vehicles);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

ngOnInit(): void {

  this.vehicles = [

  {
    id: 'B02JF33',
    date: '24.03.2024',
    ownerName: 'ownerName',
    ownerSurname: 'adpisngo',
    ownerPhone: 'string',
    ownerEmail: 'string',
    ownerCNP: '12324',
    ownerIdentityCard: 'ownerIdentityCard',
    vehicleManufacturer: 'KIA',
    vehicleModel: 'CEED',
    vehicleYear: '2003',
    vehicleVinNumber: 'WVW527HF7FF320A',
    vehicleIdentityCard: 'vehicleIdentityCard',
    vehicleNumberPlate: 'MM47GHK',
    certificatePaymentProof: true,
    ownershipProof: 'ownershipProof',
    details: 'Lipsă asigurare',
    status: 'În așteptare',
  },
];
}
}
