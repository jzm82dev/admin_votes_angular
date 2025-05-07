import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router } from '@angular/router';
import allLocales from '@fullcalendar/core/locales-all';
import { ReservationsService } from '../service/reservations.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  public routes = routes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any[] = [];
  public calendarStart:any;
  public calendarEnd:any;
  public reservations:any = [];
  public translations:any = []

  constructor(private data: DataService, public router: Router, public reservationsSrv: ReservationsService, public translate: TranslateService) {

    this.initializeLanguage();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.data.getEvents().subscribe((events: any) => {
      this.events = events;
      this.options = { ...this.options, ...{ events: events.data } };
    });
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      
      /*dateClick: function(info: any) {
        this.goCourts();
        alert('Clicked on: ' + info.dateStr);
        alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        alert('Current view: ' + info.view.type);
        // change the day's background color just for fun
        info.dayEl.style.backgroundColor = 'red';
      },
      */
      datesSet: this.handleMonthChange.bind(this),
      dateClick: this.goDay.bind(this),
      initialDate: new Date(),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth', // ,timeGridWeek,timeGridDay
      },
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      eventOverlap: this.goDay.bind(this),
      locales: allLocales,
      locale: this.reservationsSrv.authSrv.language,
      events: [
        { title: 'Meeting', start: new Date() }
      ],
    };
  }
  
 
  initializeLanguage(){ 
    this.translate.use(this.reservationsSrv.authSrv.language);
    this.translate.setDefaultLang(this.reservationsSrv.authSrv.language);

    this.translate.get(['reservations'])
      .subscribe((resp:any) => {
        this.translations = resp;
      });   

  }

   handleMonthChange(payload:any) {
    
    let pipe = new DatePipe('en-US');
    
    if (this.calendarStart != payload.startStr) {
      this.calendarStart = payload.startStr;
      this.calendarEnd = payload.endStr;
      let range = {
        'start_date': pipe.transform(payload.startStr, 'yyyy-MM-dd'),
        'end_date':pipe.transform(payload.endStr, 'yyyy-MM-dd')
      }
      
      this.reservationsSrv.getReservationPerRange(range).subscribe((resp:any) => {
        this.reservations = resp.resservations;
        this.operateRerservations();
        this.options = { ...this.options, ...{ events: this.reservations } };
      });
        
    }
  }

  operateRerservations(){
    this.reservations.forEach((reservation:any)=> {
     reservation.title = this.translations['reservations'].court + ' ' + reservation.title;
    });
  }

  /*
  ngOnInit(): void {
    let data = {
      'month': 4
    };
    this.reservationsSrv.getReservationPerMonth(data).subscribe((resp:any) => {
      this.options = { ...this.options, ...{ events: resp.resservations } };
      console.log(resp);
    });
  }
 */

  goCourts(){
    this.router.navigate([routes.login]);
  }

  goDay(event:any){
    this.router.navigate([routes.courtReservation, event.dateStr]);
    
  }
}
