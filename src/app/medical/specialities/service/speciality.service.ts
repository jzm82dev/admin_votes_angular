import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor( public http: HttpClient, public authSrv: AuthService) { }


  storeSpeciality(data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/specialities";
    return this.http.post(url, data, { headers: headers }); 
  }

  listSpecialities(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/specialities';
    return this.http.get(url, { headers: headers }); 
  }

  getSpecialicity( idSpecialicity: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/specialities/" + idSpecialicity;
    return this.http.get( url, {headers: headers});
  }

  updateSpeciality( id_speciality: any, data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/specialities/update/" + id_speciality;
    return this.http.post(url, data, { headers: headers }); 
  }

  deleteSpeciality( id_speciality: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/specialities/" + id_speciality;
    return this.http.delete(url, { headers: headers }); 
  }

}
