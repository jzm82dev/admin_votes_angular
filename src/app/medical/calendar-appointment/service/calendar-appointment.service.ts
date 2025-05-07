import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarAppointmentService {

  
  constructor(public http: HttpClient, public authSrv: AuthService) { }

  calendarAppointment(doctor_search:string = '', patient_search:string = '', specialitie_id: string = ''){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/appointment/calendar?';
    let filter_link = '';
    if(doctor_search != ''){
      filter_link += '&search_doctor=' + doctor_search ;
    }
    if(patient_search != ''){
      filter_link += '&search_patient=' + patient_search ;
    }
    if(specialitie_id != ''){
      filter_link += '&specialitie_id=' + specialitie_id ;
    }
   
    return this.http.get(url + filter_link, { headers: headers }); 
  }
}
