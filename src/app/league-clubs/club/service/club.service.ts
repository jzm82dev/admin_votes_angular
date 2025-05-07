import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listClubs( page:number = 1, search:string = ''){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/clubs?page=' + page + '&search=' + search;
    return this.http.get(url, { headers: headers }); 
  }

  getClub( club_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/clubs/" + club_id;
    return this.http.get( url, {headers: headers});
  }
  
  storeDataClub( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs";
    return this.http.post(url, data, { headers: headers });  
  }

  storeWeeklyScheduleClub( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/updateWeekly";
    return this.http.post(url, data, { headers: headers });  
  }

  getClubProfile(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/clubs/profile";
    return this.http.get( url, {headers: headers});
  }

  editClub( club_id: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/update/" + club_id;
    return this.http.post(url, data, { headers: headers });  
  }

  deleteClub( club_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/" + club_id;
    return this.http.delete(url, { headers: headers }); 
  }

  config(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/clubs/config';
    return this.http.get(url, { headers: headers }); 
  }

  getPendingMembers(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/clubs/pending-members';
    return this.http.get(url, { headers: headers }); 
  }

}
