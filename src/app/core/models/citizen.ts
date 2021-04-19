
import { CitizenStateType } from '../enums/citizen-state.enum';
import { Address } from './address';
import { Hospital } from './hospital';

export interface Citizen {
  address: Address;
  email: string;
  hospital: Hospital;
  name: string;
  surname: string;
  pesel: string;
  phone_number: string;
  state: CitizenStateType;
}
