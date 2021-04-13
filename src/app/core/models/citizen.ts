import { CitizenStateType } from '../enums/citizen-state.enum';
import { Hospital } from './hospital';

export interface Citizen {
  address: any;
  email: string;
  hospital: Hospital;
  name: string;
  surname: string;
  pesel: string;
  phone_number: string;
  state: CitizenStateType;
}
