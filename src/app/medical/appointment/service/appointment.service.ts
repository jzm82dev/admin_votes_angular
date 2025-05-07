import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listAppointment(page:number = 1, search:string = '', specialitie_id: string = '', date: any=null){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/appointment?page=' + page + '&search=' + search ;
    let filter_link = '';
    if(search != ''){
      filter_link += '&search=' + search ;
    }
    if(specialitie_id != ''){
      filter_link += '&specialitie_id=' + specialitie_id ;
    }
    if(date != null){
      filter_link += '&date=' + date ;
    }
    console.log(filter_link)
    return this.http.get(url + filter_link, { headers: headers }); 
  }

  config(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/appointment/config';
    return this.http.get(url, { headers: headers }); 
  }

  filter( data: any ){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/appointment/filter?hour_appointment=' + data.hour + '&specialitie=' + data.specialitie_id + '&date_appointment=' + data.date_appointment;
    return this.http.get(url, { headers: headers }); 
  }

  findPatient( dni: string){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/appointment/find?dni=' + dni;
    return this.http.get(url, { headers: headers });
  }

  registerAppointment(data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/appointment";
    return this.http.post(url, data, { headers: headers });  
  }

  deleteAppointment( id_appointment: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/appointment/" + id_appointment;
    return this.http.delete(url, { headers: headers }); 
  }

  getAppointment( id_appointment:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/appointment/" + id_appointment;
    return this.http.get( url, {headers: headers});
  }

  updateAppointment( id_appointment: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/appointment/update/" + id_appointment;
    return this.http.post(url, data, { headers: headers }); 
  }

  updateAttention(id_appointment: any, data:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/appointment-attention/update/" + id_appointment;
    return this.http.post(url, data, { headers: headers }); 
  }

  getAppointmentAttention( id_appointment:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/appointment-attention/" + id_appointment;
    return this.http.get( url, {headers: headers});
  }

}
