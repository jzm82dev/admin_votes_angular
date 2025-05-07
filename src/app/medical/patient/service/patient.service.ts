import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listPatients( page:number = 1, search:string = ''){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/patients?page=' + page + '&search=' + search;
    return this.http.get(url, { headers: headers }); 
  }


  storePatient( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/patients";
    return this.http.post(url, data, { headers: headers });  
  }

  deletePatient( patient_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/patients/" + patient_id;
    return this.http.delete(url, { headers: headers }); 
  }

  getPatient( patient_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/patients/" + patient_id;
    return this.http.get( url, {headers: headers});
  }

  editPatient( patient_id: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/patients/update/" + patient_id;
    return this.http.post(url, data, { headers: headers }); 
  }

  getPatientProfile( patient_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/patients/profile/" + patient_id;
    return this.http.get( url, {headers: headers});
  }
  
}
