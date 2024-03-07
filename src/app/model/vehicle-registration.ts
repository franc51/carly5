import { MatPaginator } from "@angular/material/paginator";

export interface VehicleRegistration {
  id: any;
  date: string;
  ownerName: string;
  ownerSurname: string;
  ownerPhone: string;
  ownerCNP: number;
  ownerIdentityCard: string;
  vehicleManufacturer: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleVinNumber: string;
  vehicleIdentityCard: string;
  vehicleNumberPlate: string;
  certificatePaymentProof: boolean;
  ownershipProof: string;
  details?: 'Certificatul de înmatriculare și plăcuțele au fost trimise.' | 'Lipsa asigurare';
  status?: 'Aprobat' | 'Respins' | 'În așteptare';
  paginator?: MatPaginator;
}
