import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  editPlayer( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/player-data/update";
    return this.http.post(url, data, { headers: headers });  
  }

  getProfile( id_player:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/player-data/profile";
    return this.http.get( url, {headers: headers});
  }

  getMyClubs(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/player-data/get-my-clubs";
    return this.http.get( url, {headers: headers});
  }

  getOtherClubs(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/player-data/other-clubs";
    return this.http.get( url, {headers: headers});
  }

  regiterClub(club_id:string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/player-data/register-club/" + club_id;
    return this.http.post(url, null, { headers: headers });
  }

  cancelRegiterClub(club_id:string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/player-data/cancel-register-club/" + club_id;
    return this.http.post(url, null, { headers: headers });
  }

  deleteMember( id_club_user: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/player-data/" + id_club_user;
    return this.http.delete(url, { headers: headers }); 
  }

  acceptClubPlayer(club_user_id: string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/player-data/accept-club-user/" + club_user_id;
    return this.http.post(url, null, { headers: headers });
  }

  cancelClubPlayer(club_user_id: string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/player-data/cancel-club-user/" + club_user_id;
    return this.http.post(url, null, { headers: headers });
  }

  getPlayerData(user_id: string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/player-data/get-member-data/" + user_id;
    return this.http.post(url, null, { headers: headers });
  }

  getMatchs(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/player-data/get-matches";
    return this.http.post(url, null, { headers: headers });
  }

  getlWallets(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/player-data/get-wallets";
    return this.http.post(url, null, { headers: headers });
  }
  
}
