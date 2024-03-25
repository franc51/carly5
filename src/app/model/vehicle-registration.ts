export interface VehicleRegistration {
  _id: string;
  date: Date;
  ownerName: string;
  ownerSurname: string;
  ownerPhone: number;
  ownerEmail: string;
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
  details: string;
  status: string;
  count: number;
}
