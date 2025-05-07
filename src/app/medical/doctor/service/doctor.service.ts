import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listDoctors(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/doctors';
    return this.http.get(url, { headers: headers }); 
  }

  getscheduleHours(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/doctors/schedule';
    return this.http.get(url, { headers: headers }); 
  }

  config(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/doctors/config';
    return this.http.get(url, { headers: headers }); 
  }


  storeDoctor( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/doctors";
    return this.http.post(url, data, { headers: headers });  
  }

  deleteDoctor( id_doctor: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/doctors/" + id_doctor;
    return this.http.delete(url, { headers: headers }); 
  }

  getDoctor( id_doctor:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/doctors/" + id_doctor;
    return this.http.get( url, {headers: headers});
  }

  updateDoctor( id_doctor: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/doctors/update/" + id_doctor;
    return this.http.post(url, data, { headers: headers }); 
  }

  updateProfileDoctor( id_doctor: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/doctors/update_profile/" + id_doctor;
    return this.http.post(url, data, { headers: headers }); 
  }
  

  getProfile( id_doctor:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/doctors/profile/" + id_doctor;
    return this.http.get( url, {headers: headers});
  }
}
