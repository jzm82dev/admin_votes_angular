import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  
  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listTournaments( page:number = 1, search:string = ''){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/tournaments?page=' + page + '&search=' + search;
    return this.http.get(url, { headers: headers }); 
  }

  listRoles(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/staffs/roles';
    return this.http.get(url, { headers: headers }); 
  }

  storeTournament( data: any){
    console.log(data)
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/tournaments";
    return this.http.post(url, data, { headers: headers });  
  }

  deleteTournament( id_tournament: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/tournaments/" + id_tournament;
    return this.http.delete(url, { headers: headers }); 
  }

  getTournament( id_tournament:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/tournaments/" + id_tournament;
    return this.http.get( url, {headers: headers});
  }

  editTournament( id_tournament: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/tournaments/update/" + id_tournament;
    return this.http.post(url, data, { headers: headers }); 
  }

  
  getDraw( id_tournament:any, type:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/tournaments/get-draw/" + id_tournament + '/' + type;
    console.log(url);
    return this.http.get( url, {headers: headers});
  }

  getMatch( id_match:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/tournaments/get-match-data/" + id_match;
    return this.http.get( url, {headers: headers});
  }

  saveResult( match_id:any, data: any){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/tournaments/save-result/' + match_id;
    return this.http.post(url, data, { headers: headers });  
  }

  saveResultPickleball( match_id:any, data: any){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/tournaments/save-result-pickleball/' + match_id;
    return this.http.post(url, data, { headers: headers });  
  }

  updateScheduleMatch(match_id:any, data: any){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/tournaments/update-schedule-match/' + match_id;
    return this.http.post(url, data, { headers: headers });  
  }

  saveSchedule( data: any ){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/tournament-schedule";
    return this.http.post(url, data, { headers: headers }); 
  }

  deleteSchedule( schedule_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/tournament-schedule/" + schedule_id;
    return this.http.delete(url, { headers: headers }); 
  }

  saveScheduleCouple( data: any ){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/couple-tournament-schedule";
    return this.http.post(url, data, { headers: headers }); 
  }

  deleteScheduleCouple(schedule_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/couple-tournament-schedule/" + schedule_id;
    return this.http.delete(url, { headers: headers }); 
  }

  getClasification( category_id:any ){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/tournaments/clasification/' + category_id;
    return this.http.get(url, { headers: headers }); 
  }

  getMatchsSimpleLeague( category_id:string ){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/tournaments/get-matches-simple-league/" + category_id;
    return this.http.get(url, { headers: headers });
  }

 

}
