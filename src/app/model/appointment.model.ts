export interface Appointment {
  userId: string;
  service: 'ITP' | 'RAR'; 
  date: string;            
  time: string;  
  company: string;  
  pickupAndReturn: boolean; 
  pickupDetails?: {
    city: string;
    address: string;
  };
}
