import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentState } from '../enums/appointment-state.enum';

@Pipe({
  name: 'appointmentStateTranslator',
})
export class AppointmentStateTranslatorPipe implements PipeTransform {
  transform(value: AppointmentState): string {
    switch (value) {
      case AppointmentState.Assigned:
        return 'Przypisane';
      case AppointmentState.Available:
        return 'Dostępne';
      case AppointmentState.Not_made:
        return 'Anulowane';
      case AppointmentState.Made:
        return 'Wykonane';
    }
    return null;
  }
}
