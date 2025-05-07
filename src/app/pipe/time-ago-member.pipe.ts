import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Pipe({
  name: 'timeAgoMember'
})
export class TimeAgoMemberPipe implements PipeTransform {

  private timer: any;
  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone, public authSrv: AuthService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  transform(value:string) {
    

    let trans:any = {
      'es': {
        'today': 'Hoy',
        'yesterday': 'Ayer',
        'tomorrow': "Mañana"
      },
      'en': {
        'today': 'Today',
        'yesterday': 'Yesterday',
        'tomorrow': "Tomorrow"
      }
    };

    let d = new Date(value);
    let dayAppointment = d.getDay();
    let monthAppointment = d.getMonth();
    let yearAppointment = d.getFullYear();

    let today = new Date();
    let dayToday = today.getDay();
    let monthToday = today.getMonth();
    let yearToday = today.getFullYear();

    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1)
    let dayYesterday = yesterday.getDay();
    let monthYesterday = yesterday.getMonth();
    let yearYesterday = yesterday.getFullYear();

    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1)
    let dayTomorrow = tomorrow.getDay();
    let monthTomorro = tomorrow.getMonth();
    let yearTomorro = tomorrow.getFullYear();
    

    if (dayAppointment == dayToday && monthAppointment == monthToday && yearAppointment == yearToday)
      return trans[this.authSrv.language].today
    else if (d.getDate() == yesterday.getDate() && monthAppointment == monthYesterday && yearAppointment == yearYesterday){
      return trans[this.authSrv.language].yesterday
    }else if (d.getDate() == tomorrow.getDate() && monthAppointment == monthTomorro && yearAppointment == yearTomorro){
      return trans[this.authSrv.language].tomorrow
    }
    else{
      return (new DatePipe("en-US")).transform(value, 'dd/MM/yyyy');

  }

}

}
