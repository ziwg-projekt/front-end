import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentState } from '../enums/appointment-state.enum';

@Pipe({
  name: 'appointmentStateTranslator',
})
export class AppointmentStateTranslatorPipe implements PipeTransform {
  transform(value: AppointmentState): string {
    switch (value) {
      case AppointmentState.Confirmed:
        return 'Zatwierdzone';
      case AppointmentState.Cancelled:
        return 'Anulowane';
      case AppointmentState.Finished:
        return 'Ukończone';
    }
    return null;
  }
}
