import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppointmentState } from 'src/app/core/enums/appointment-state.enum';
import { Appointment } from 'src/app/core/models/appointment';
import { PortalService } from 'src/app/core/services/portal.service';
import { AppointmentConfirmDialogComponent } from '../appointment-confirm-dialog/appointment-confirm-dialog.component';
@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss'],
})
export class AppointmentViewComponent implements OnInit {
  @Input() appointment: Appointment;
  appointmentState = AppointmentState;
  constructor(public dialog: MatDialog,
    private toastrService: ToastrService,
    private portalService: PortalService) {}

  ngOnInit() {}
 
  cancelAppointment(event:Event){
    event.stopPropagation();
    this.openDialog("cancel");
  }

  doneAppointment(event:Event){
    event.stopPropagation();
    this.openDialog("confirm");
  }

  openDialog(mode){
    const dialogRef = this.dialog.open(AppointmentConfirmDialogComponent, {
      width: '500px',
      data: {
        mode:mode,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        if(mode=="cancel"){
          this.portalService.notMadeAppointment(this.appointment).subscribe(a=>{
            this.appointment = a;
            this.toastrService.success("Pomyślnie odwołono szczepienie dla danego pacjenta")
          })
        } else if(mode=="confirm"){
          this.portalService.madeAppointment(this.appointment).subscribe(a=>{
            this.appointment = a;
            this.toastrService.success("Pomyślnie zmieniono status szczepienia")
          })
        }}})
      }
}
