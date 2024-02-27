export interface VehicleRegistration {
  id: any;
  date: string;
  ownerName: string;
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
  status?: 'Aprobat' | 'Respins' | 'În așteptare';
}
