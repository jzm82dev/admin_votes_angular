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

  saveTournament( id_tournament: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url: string = URL_SERVICIOS + "/tournaments/update/" + id_tournament;
    if( id_tournament == ''){
      url = URL_SERVICIOS + "/tournaments";
    }
    return this.http.post(url, data, { headers: headers }); 
  }

  
  getDraw( id_tournament:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/tournaments/get-draw/" + id_tournament;
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

  editSchedule( data: any, id_schedule: any ){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/tournament-schedule/update/" + id_schedule;
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

  configureTournament( tournament_id: string ){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/tournaments/configure-tournament/" + tournament_id;
    return this.http.get( url, {headers: headers});
  }


  checkEnoughCourtsAllMatches( tournament_id:string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/tournaments/check-configure-tournament/" + tournament_id;
    return this.http.get( url, {headers: headers});
  }


  configMatchesPage(tournament_id: string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/tournaments/config-matches-page/" + tournament_id;
    return this.http.get( url, {headers: headers});
  }

  getAllMatchesTournament(tournament_id: string, page:number = 1, player_name_earch:string = '', 
                          status_match_id: string = '', court_id: string = '', date: any = null, category_id: any = null ){
      
        let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
        let url = URL_SERVICIOS + '/tournaments/get-all-matches?tournament_id=' + tournament_id +'&page=' + page ;
        let filter_link = '';

        if(player_name_earch != ''){
          filter_link += '&player_name_search=' + player_name_earch ;
        }
        if(status_match_id != ''){
          filter_link += '&status_match_id=' + status_match_id ;
        }
        if(court_id != ''){
          filter_link += '&court_id=' + court_id ;
        }
        if(date != null){
          filter_link += '&date=' + date ;
        }
        if(category_id != ''){
          filter_link += '&category_id=' + category_id ;
        }

        return this.http.get(url + filter_link, { headers: headers });  
  }

  getAllPlayersTournament(tournament_id: string, page:number = 1, player_name_earch:string = '', 
                          status_match_id: string = '', court_id: string = '', date: any = null, category_id: any = null ){
      
        let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
        let url = URL_SERVICIOS + '/tournaments/get-all-players?tournament_id=' + tournament_id +'&page=' + page ;
        let filter_link = '';

        if(player_name_earch != ''){
          filter_link += '&player_name_search=' + player_name_earch ;
        }
        if(status_match_id != ''){
          filter_link += '&status_match_id=' + status_match_id ;
        }
        if(court_id != ''){
          filter_link += '&court_id=' + court_id ;
        }
        if(date != null){
          filter_link += '&date=' + date ;
        }
        if(category_id != ''){
          filter_link += '&category_id=' + category_id ;
        }

        return this.http.get(url + filter_link, { headers: headers });  
  }

  configPlayersPage(tournament_id: string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/tournaments/config-matches-page/" + tournament_id;
    return this.http.get( url, {headers: headers});
  }

  paidPlayerTournament(couple_player_id:string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/tournaments/paid-player-tournament/" + couple_player_id;
    return this.http.post(url, null, { headers: headers });
  }

  unpaidPlayerTournament(couple_player_id:string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/tournaments/unpaid-player-tournament/" + couple_player_id;
    return this.http.post(url, null, { headers: headers });
  }


}
