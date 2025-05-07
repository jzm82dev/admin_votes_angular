import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS, URL_FRONTEND } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }


  storeQuestions( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/players/save-questions";
    return this.http.post(url, data, { headers: headers });  
  }

  storePlayer( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + '/auth/players';
    return this.http.post(url, data, { headers: headers });  
  }

  deletePlayer( id_player: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/players/" + id_player;
    return this.http.delete(url, { headers: headers }); 
  }

  getPlayer( id_player:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/players/" + id_player;
    return this.http.get( url, {headers: headers});
  }

  updatePlayer( id_player: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/players/update/" + id_player;
    return this.http.post(url, data, { headers: headers }); 
  }

}
