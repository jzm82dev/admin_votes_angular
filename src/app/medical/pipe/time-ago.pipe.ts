import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  private timer: any;
	constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}
	transform(value:string) {
		
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
      return "Today";
    else if (d.getDate() == yesterday.getDate() && monthAppointment == monthYesterday && yearAppointment == yearYesterday){
      return "Yesterday";
    }else if (d.getDate() == tomorrow.getDate() && monthAppointment == monthTomorro && yearAppointment == yearTomorro){
      return "Tomorrow"; 
    }
    else{
      return (new DatePipe("en-US")).transform(value, 'dd/MM/yyyy');

	}

}
}
