import { VaccineState } from '../enums/vaccine-state.enum';
import { VaccineType } from '../enums/vaccine-type.enum';
import { Company } from './company';
import { Hospital } from './hospital';

export interface Vaccine {
  id: number;
  code: string;
  company: Company;
  hospital: Hospital;
  state: VaccineState;
  type: VaccineType;
}
