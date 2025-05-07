import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listPlayers( page:number = 1, search:string = ''){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/players?page=' + page + '&search=' + search;
    return this.http.get(url, { headers: headers }); 
  }

  getPlayer( player_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/players/" + player_id;
    return this.http.get( url, {headers: headers});
  }
  
  storePlayer( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/players";
    return this.http.post(url, data, { headers: headers });  
  }

  editPlayer( player_id: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/players/update/" + player_id;
    return this.http.post(url, data, { headers: headers });  
  }

  deletePlayer( player_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/players/" + player_id;
    return this.http.delete(url, { headers: headers }); 
  }

  config(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/players/config';
    return this.http.get(url, { headers: headers }); 
  }
}
