import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MonitorsService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listMonitors(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/monitors';
    return this.http.get(url, { headers: headers }); 
  }

  storeWeeklyLessons( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/monitors/save-lessons";
    return this.http.post(url, data, { headers: headers });  
  }

  getscheduleHours(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/monitors/schedule';
    return this.http.get(url, { headers: headers }); 
  }

  config(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/monitors/config';
    return this.http.get(url, { headers: headers }); 
  }


  storeMonitor( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/monitors";
    return this.http.post(url, data, { headers: headers });  
  }

  deleteMonitor( id_monitor: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/monitors/" + id_monitor;
    return this.http.delete(url, { headers: headers }); 
  }

  getMonitor( id_monitor:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/monitors/" + id_monitor;
    return this.http.get( url, {headers: headers});
  }

  updateMonitor( id_monitor: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/monitors/update/" + id_monitor;
    return this.http.post(url, data, { headers: headers }); 
  }

  updateProfileMonitor( id_monitor: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/monitors/update_profile/" + id_monitor;
    return this.http.post(url, data, { headers: headers }); 
  }
  

  getProfile( id_monitor:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/monitors/profile/" + id_monitor;
    return this.http.get( url, {headers: headers});
  }
}
