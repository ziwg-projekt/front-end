import { Citizen } from './citizen';
import { Vaccine } from './vaccine';

export interface Appointment {
  id?: number;
  citizen: Citizen;
  state?: any;
  vaccine: Vaccine;
  date: string;
}
