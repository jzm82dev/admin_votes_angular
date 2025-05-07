import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }


  sendEmail( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/emails/send-email";
    return this.http.post(url, data, { headers: headers });  
  }

  storePotentialClub(data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/potential-clubs";
    return this.http.post(url, data, { headers: headers });  
  }

  listPotentialClubs(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/potential-clubs';
    return this.http.get(url, { headers: headers }); 
  }

  deletePotenitialClub(id_monitor: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/members/" + id_monitor;
    return this.http.delete(url, { headers: headers }); 
  }

  getClub(club_id: string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/potential-clubs/" + club_id;
    return this.http.get( url, {headers: headers});
  }

  updateClubr( id_club: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/potential-clubs/update/" + id_club;
    return this.http.post(url, data, { headers: headers }); 
  }

}
