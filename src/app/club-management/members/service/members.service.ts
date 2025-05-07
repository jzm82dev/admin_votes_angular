import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listMembers(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/members';
    return this.http.get(url, { headers: headers }); 
  }

  config(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/members/config';
    return this.http.get(url, { headers: headers }); 
  }


  storeMember( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/members";
    return this.http.post(url, data, { headers: headers });  
  }

  deleteMember( id_monitor: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/members/" + id_monitor;
    return this.http.delete(url, { headers: headers }); 
  }

  getMember( id_monitor:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/members/" + id_monitor;
    return this.http.get( url, {headers: headers});
  }

  updateMember( id_monitor: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/members/update/" + id_monitor;
    return this.http.post(url, data, { headers: headers }); 
  }

  findPotentialMember( data_search: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/members/get-potential-members/";
    return this.http.post(url, data_search, { headers: headers }); 
  }

}
