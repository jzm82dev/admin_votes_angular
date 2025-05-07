import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JorneyService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listJorneys( page:number = 1, search:string = ''){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/journeys?page=' + page + '&search=' + search;
    return this.http.get(url, { headers: headers }); 
  }

  getJorney( jorney_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/journeys/" + jorney_id;
    return this.http.get( url, {headers: headers});
  }
  
  storeJorney( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/journeys";
    return this.http.post(url, data, { headers: headers });  
  }

  editJorney( jorney_id: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/journeys/update/" + jorney_id;
    return this.http.post(url, data, { headers: headers });  
  }

  deleteJorney( jorney_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/journeys/" + jorney_id;
    return this.http.delete(url, { headers: headers }); 
  }

  getCategories(data: any ){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/journeys/categories";
    return this.http.post( url, data, {headers: headers});
  }

  createGameJourney(data: any ){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/journeys/create-game";
    return this.http.post( url, data, {headers: headers});
  }

  getGameJuorneyCategory( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/journeys/get-game-category-journey";
    return this.http.post( url, data, {headers: headers});
  }

  getGameItems( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/journeys/get-game-items";
    return this.http.post( url, data, {headers: headers});
  }

  saveGameBoard( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/journeys/save-game-board";
    return this.http.post( url, data, {headers: headers});
  }

  deleteBoard( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/journeys/remove_board";
    return this.http.post(url, data, { headers: headers }); 
  }

}
