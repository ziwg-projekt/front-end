import { VaccineStateEnum } from '../enums/vaccine-state.enum';
import { Company } from './company';
import { Hospital } from './hospital';

export interface Vaccine {
  id: number;
  code: string;
  company: Company;
  hospital: Hospital;
  state: VaccineStateEnum;
  type: string;
}
