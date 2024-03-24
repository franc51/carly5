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
  details: 'Lipsă asigurare' | 'Cerere trimisă';
  status: 'Respins' | 'Aprobat' | 'În așteptare';
  count: number;
}
