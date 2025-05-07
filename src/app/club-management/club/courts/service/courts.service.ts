import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourtsService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }


  listCourts( page:number = 1, search:string = ''){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/courts?page=' + page + '&search=' + search;
    return this.http.get(url, { headers: headers }); 
  }

  storeCourt( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/courts";
    return this.http.post(url, data, { headers: headers });  
  }

  config(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/courts/config';
    return this.http.get(url, { headers: headers }); 
  }

  getCourt( id_court:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/courts/" + id_court;
    return this.http.get( url, {headers: headers});
  }

  updateCourt( id_court: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/courts/update/" + id_court;
    return this.http.post(url, data, { headers: headers }); 
  }

  deleteCourt( court_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/courts/" + court_id;
    return this.http.delete(url, { headers: headers }); 
  }


  storeSchedule(data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/courts";
    return this.http.post(url, data, { headers: headers }); 
  }

  

  getSchedulesDay( date: any){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/appointment/config';
    return this.http.get(url + date, { headers: headers }); 
  }

  getAllCourts( ){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/courts/get-all";
    return this.http.get( url, {headers: headers});
  }

}


