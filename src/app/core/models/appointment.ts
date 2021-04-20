import { Citizen } from './citizen';
import { Doctor } from './doctor';
import { Vaccine } from './vaccine';

export interface Appointment {
  id?: number;
  citizen: Citizen;
  state?: any;
  vaccine: Vaccine;
  doctor: Doctor;
  date: string;
}
