import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS, URL_FRONTEND } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterClubService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }



  storeClub( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + '/auth/clubs';
    return this.http.post(url, data, { headers: headers });  
  }


}
