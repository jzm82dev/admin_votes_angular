import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listTeams( page:number = 1, search:string = ''){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/teams?page=' + page + '&search=' + search;
    return this.http.get(url, { headers: headers }); 
  }

  getTeam( team_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/teams/" + team_id;
    return this.http.get( url, {headers: headers});
  }
  
  storeTeam( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/teams";
    return this.http.post(url, data, { headers: headers });  
  }

  editTeam( team_id: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/teams/update/" + team_id;
    return this.http.post(url, data, { headers: headers });  
  }

  deleteTeam( team_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/teams/" + team_id;
    return this.http.delete(url, { headers: headers }); 
  }

  config(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/teams/config';
    return this.http.get(url, { headers: headers }); 
  }

  getCategoriesByLeague(data: any){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/teams/categories';
    return this.http.post(url, data, { headers: headers }); 
  }

  getPossiblePlayers( data: any){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/teams/possible-players';
    return this.http.post(url, data, { headers: headers }); 
  }

  addPlayers(data:any){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/teams/add-players';
    return this.http.post(url, data, { headers: headers }); 
  }

  deletePlayers(data:any){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/teams/delete-player';
    return this.http.post(url, data, { headers: headers }); 
  }

}
