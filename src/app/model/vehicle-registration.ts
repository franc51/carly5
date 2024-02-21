export interface VehicleRegistration {
  id: any;
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
  status?: 'Acceptat' | 'Respins' | 'În așteptare';
}
