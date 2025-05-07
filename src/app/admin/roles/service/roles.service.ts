import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor( public http: HttpClient, public authSrv: AuthService) { }

  listRoles(){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/roles";
    console.log('url:', url );
    console.log('token:', this.authSrv.token)
    return this.http.get(url, { headers: headers }); 
  }

  showRole( id_role:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/roles/" + id_role;
    return this.http.get( url, {headers: headers});
  }

  storeRoles(data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/roles";
    return this.http.post(url, data, { headers: headers }); 
  }

  editRoles(data:any, id_role:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/roles/" + id_role;
    return this.http.put(url, data, { headers: headers }); 
  }

  deleteRoles(id_role: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/roles/" + id_role;
    return this.http.delete(url, { headers: headers }); 
  }
}
