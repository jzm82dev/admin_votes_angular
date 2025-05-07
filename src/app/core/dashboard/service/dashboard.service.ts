import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( public http: HttpClient, public authSrv: AuthService) { }

  getConfigDashboard(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/dashboard/config";
    return this.http.get(url, { headers: headers }); 
  }

  getDataAdmin(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/dashboard/admin";
    return this.http.post(url, null, { headers: headers }); 
  }

  getDataAdminYear(data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/dashboard/admin-year";
    return this.http.post(url, data, { headers: headers }); 
  }

  getDashboardDoctor( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/dashboard/doctor";
    return this.http.post(url, data, { headers: headers }); 
  }

  getDashboardYearDoctor( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/dashboard/doctor-year";
    return this.http.post(url, data, { headers: headers }); 
  }

}
