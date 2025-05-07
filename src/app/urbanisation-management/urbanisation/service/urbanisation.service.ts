import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UrbanisationService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }


  listUrbanisations(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/urbanisations';
    return this.http.get(url, { headers: headers }); 
  }

  saveUrbanisation( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/urbanisations";
    return this.http.post(url, data, { headers: headers });  
  }

  updateUrbanisation( urbanisation_id: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/urbanisations/update/" + urbanisation_id;
    return this.http.post(url, data, { headers: headers }); 
  }

  updatUrbanisation( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/urbanisations";
    return this.http.post(url, data, { headers: headers });  
  }

  config(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/urbanisations/get-countries";
      return this.http.get(url, { headers: headers }); 
  }

  getStates( country_id: any){
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/urbanisations/get-states/" + country_id;
      return this.http.get(url, { headers: headers }); 
  }
  
  getCities( state_id: string){
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/urbanisations/get-cities/" + state_id;
      return this.http.get(url, { headers: headers }); 
  }

  getUrbanisation(urbanisation_id: string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/urbanisations/" + urbanisation_id;
    return this.http.get( url, {headers: headers});
  }

  deleteUrbanisation( urbanisation_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/urbanisations/" + urbanisation_id;
    return this.http.delete(url, { headers: headers }); 
  }



}
