import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listLeagues( page:number = 1, search:string = ''){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/leagues?page=' + page + '&search=' + search;
    return this.http.get(url, { headers: headers }); 
  }

  config(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/leagues/config";
    return this.http.get( url, {headers: headers});
  }

  getLeague( league_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/leagues/" + league_id;
    return this.http.get( url, {headers: headers});
  }
  
  storeLeague( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/leagues";
    return this.http.post(url, data, { headers: headers });  
  }

  editLeague( league_id: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/leagues/update/" + league_id;
    return this.http.post(url, data, { headers: headers });  
  }

  deleteLeague( league_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/leagues/" + league_id;
    return this.http.delete(url, { headers: headers }); 
  }

   getAllPlayersLeague(league_id: string, page:number = 1, player_name_earch:string = '', 
                          status_match_id: string = '', court_id: string = '', date: any = null, category_id: any = null ){
      
        let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
        let url = URL_SERVICIOS + '/leagues/get-all-players?league_id=' + league_id +'&page=' + page ;
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

  paidPlayerLeague(couple_player_id:string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/leagues/paid-player-tournament/" + couple_player_id;
    return this.http.post(url, null, { headers: headers });
  }

  unpaidPlayerLeague(couple_player_id:string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/leagues/unpaid-player-tournament/" + couple_player_id;
    return this.http.post(url, null, { headers: headers });
  }

  

}
