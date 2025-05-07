import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentPayService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listAppointmentPays(page:number = 1, doctor_name_earch:string = '', client_name_earch:string = '', specialitie_id: string = '', 
                 date_from: any = null, date_to: any = null ){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/appointment-pay?page=' + page ;
    let filter_link = '';
   
    if(doctor_name_earch != ''){
      filter_link += '&doctor_name_search=' + doctor_name_earch ;
    }
    if(client_name_earch != ''){
      filter_link += '&patient_name_search=' + client_name_earch ;
    }
    if(specialitie_id != ''){
      filter_link += '&specialitie_id=' + specialitie_id ;
    }
    if(date_from != null){
      filter_link += '&date_from=' + date_from ;
    }
    if(date_to != null){
      filter_link += '&date_to=' + date_to ;
    }
    console.log(filter_link)
    return this.http.get(url + filter_link, { headers: headers }); 
  }

  
  config(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/appointment/config';
    return this.http.get(url, { headers: headers }); 
  }

  registerAppointmentPay(data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/appointment-pay";
    return this.http.post(url, data, { headers: headers });  
  }

  updateAppointmentPay( id_appointment_pay: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/appointment-pay/update/" + id_appointment_pay;
    return this.http.post(url, data, { headers: headers }); 
  }

  deleteAppointmentPay( id_appointment_pay: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/appointment-pay/" + id_appointment_pay;
    return this.http.delete(url, { headers: headers }); 
  }


}
