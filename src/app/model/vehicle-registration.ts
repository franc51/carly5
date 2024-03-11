import { MatPaginator } from "@angular/material/paginator";

export interface VehicleRegistration {
  id?: any;
  date: string;
  ownerName: string;
  ownerSurname: string;
  ownerEmail: string,
  ownerPhone: string;
  ownerCNP?: number;
  ownerIdentityCard?: string;
  vehicleManufacturer: string;
  vehicleModel: string;
  vehicleYear?: number;
  vehicleVinNumber: string;
  vehicleIdentityCard?: string;
  vehicleNumberPlate: string;
  certificatePaymentProof?: boolean;
  ownershipProof?: string;
  details?: 'Lipsa asigurare';
  status?: 'În așteptare';
  paginator?: MatPaginator;
}
