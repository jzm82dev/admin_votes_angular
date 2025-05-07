import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})

export class OwnerService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

/*
  listOwners(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/owners';
    return this.http.get(url, { headers: headers }); 
  }
    */

  listOwners( page:number = 1, search:string = '', urbanisation_id: string, building: string ){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/owners?page=' + page + '&search=' + search + '&urbanisation_id=' + urbanisation_id + '&building=' + building;
    return this.http.get(url, { headers: headers }); 
  }

  listOwnerByBuilding(urbanisation_id: string, building: string ){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/owners/owner-by-building?urbanisation_id=' + urbanisation_id + '&building=' + building;
    return this.http.get(url, { headers: headers }); 
  }

  listVotesByQuestion(question_id: string){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/owners/votes-by-question?question_id=' + question_id ;
    return this.http.get(url, { headers: headers }); 
  }
  

  resultVotesByQuestion(question_id: string){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/owners/result-by-question?question_id=' + question_id ;
    return this.http.get(url, { headers: headers }); 
  }

  getOwner(owner_id: string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/owners/" + owner_id;
    return this.http.get( url, {headers: headers});
  }


  config(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/owners/config";
    return this.http.get(url, { headers: headers }); 
  }

  addProperty(data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/owners/add-property";
    return this.http.post(url, data, { headers: headers });  
  }

  removeProperty(property_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/owners/remove-property/" + property_id;
    return this.http.get( url, {headers: headers});
  }

  storeVotes( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/owners/store-votes";
    return this.http.post(url, data, { headers: headers });  
  }

}
