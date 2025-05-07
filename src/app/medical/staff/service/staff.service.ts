import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listStaffs(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/staffs';
    return this.http.get(url, { headers: headers }); 
  }

  listRoles(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/staffs/roles';
    return this.http.get(url, { headers: headers }); 
  }

  storeStaff( data: any){
    console.log(data)
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/staffs";
    return this.http.post(url, data, { headers: headers });  
  }

  deleteStaff( id_staff: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/staffs/" + id_staff;
    return this.http.delete(url, { headers: headers }); 
  }

  getStaff( id_staff:any){
    console.log(id_staff)
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/staffs/" + id_staff;
    return this.http.get( url, {headers: headers});
  }

  editStaff( staff_id: any,data: any){
    console.log(data)
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/staffs/update/" + staff_id;
    return this.http.post(url, data, { headers: headers }); 
  }
  
    

}
