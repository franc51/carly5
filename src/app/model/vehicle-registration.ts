export interface VehicleRegistration {
  count: number;
  items: any;
  total_count: number;
  id?: string;
  date: string;
  ownerName: string;
  ownerSurname: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerCNP?: string;
  ownerIdentityCard?: string;
  vehicleManufacturer: string;
  vehicleModel: string;
  vehicleYear?: string;
  vehicleVinNumber: string;
  vehicleIdentityCard?: string;
  vehicleNumberPlate: string;
  certificatePaymentProof?: boolean;
  ownershipProof?: string;
  details:
    | 'Lipsă asigurare'
    | 'Cerere trimisă'
    | 'Certificatul de inm. și plăcuțele au fost trimise';
  status: 'În așteptare' | 'Respins';
}
