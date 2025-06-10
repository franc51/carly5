export interface Appointment {
  userId: string;
  service: 'ITP' | 'RAR'; 
  date: string;            
  time: string;  
  company: string;   
}
