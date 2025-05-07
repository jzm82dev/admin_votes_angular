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
  
  updateDataClub( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/update-data";
    return this.http.post(url, data, { headers: headers });  
  }

  updateDescriptionClub( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/update-data-description";
    return this.http.post(url, data, { headers: headers });  
  }

  updateAdditionalDataClub( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/update-additional-data";
    return this.http.post(url, data, { headers: headers });  
  }

  storeWeeklyScheduleClub( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/updateWeekly";
    return this.http.post(url, data, { headers: headers });  
  }

  storeSpecialDaySechedule( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/saveSpecialDay";
    return this.http.post(url, data, { headers: headers });  
  }

  deleteSpecialDaySechedule(special_day_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/delete-special-day/" + special_day_id;
    return this.http.delete(url, { headers: headers }); 
  }
  
  getClubProfileData(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/clubs/profile-data";
    return this.http.get( url, {headers: headers});
  }

  getClubDescriptionData(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/clubs/description-data";
    return this.http.get( url, {headers: headers});
  }

  getClubSchedule(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/clubs/schedule-data";
    return this.http.get( url, {headers: headers});
  }

  storeServices( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/store-services";
    return this.http.post(url, data, { headers: headers }); 
  }


  getServices(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/clubs/services";
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

  getStates( country_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/get-states/" + country_id;
    return this.http.get(url, { headers: headers }); 
  }

  getCities( state_id: string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/get-cities/" + state_id;
    return this.http.get(url, { headers: headers }); 
  }

  getSocialLinks(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/clubs/social-link";
    return this.http.get( url, {headers: headers});
  }

  saveSocialLinks(data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/clubs/store-social-links";
    return this.http.post(url, data, { headers: headers }); 
  }

}
