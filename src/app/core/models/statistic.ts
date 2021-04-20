import { VaccineState } from '../enums/vaccine-state.enum';
export interface Statistic {
  value: string;
  type: VaccineState;
}
