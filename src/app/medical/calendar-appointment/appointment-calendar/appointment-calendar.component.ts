import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppointmentPayService } from '../../appointment-pay/service/appointment-pay.service';
import { CalendarAppointmentService } from '../service/calendar-appointment.service';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss']
})
export class AppointmentCalendarComponent {

  public routes = routes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any[] = [];

  // Search
  public searchDataDoctorValue: string = '';
  public searchDataPatientValue: string = '';
  public specialitie_value: string = '';
  public specialities: any = [];
  public user: any;


  constructor(private data: DataService, public appointmentPaysSrv: AppointmentPayService, public calendarSrv: CalendarAppointmentService) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    /*this.data.getEvents().subscribe((events: any) => {
      console.log(events);
      this.events = events;
      this.options = { ...this.options, ...{ events: events.data } };
    });*/
    
    
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialDate: new Date(),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      events: [
        { title: 'Meeting', start: new Date() }
      ]
    };
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.appointmentPaysSrv.config().subscribe( (resp: any) => {
      this.specialities = resp.specialities;
    } );
    this.user = this.appointmentPaysSrv.authSrv.user;
    this.calendarAppointment();
    
  }

  isPermited(){
    let flag = false;
    let roles = this.user.role;
    roles.forEach( (rol:any) => {
      if(rol.toUpperCase() == 'DOCTOR'){
        flag = true;
      }
    });
    
    return flag;
  }

  calendarAppointment(){
    this.calendarSrv.calendarAppointment(this.searchDataDoctorValue, this.searchDataPatientValue, this.specialitie_value).subscribe( (resp: any) => {
      this.events = resp.appointment;
      this.options = { ...this.options, ...{ events: resp.appointment } };
      console.log(this.events);
    });
  }

  filter(){
    this.calendarAppointment();
  }

  test(){
    console.log('ENTRMAMOS')
  }

}
