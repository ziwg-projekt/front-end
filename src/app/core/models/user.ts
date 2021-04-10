import { Authority } from '../enums/authority.enum';
import { Hospital } from './hospital';

export interface User {
  id: number;
  username: string;
  roles: Authority[];
  citizen: any;
  hospital: Hospital;
  userType: any; 
}
