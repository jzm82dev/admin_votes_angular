import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UrbanisationService {

   constructor( private router: Router, private http: HttpClient, public authSrv: AuthService ) { }
  

   getUrbanizations(data: any){
      let headers = new HttpHeaders( {'Access-Control-Allow-Origin':'*'});
      let url = URL_SERVICIOS + "/public/get-urbanizations";
      return this.http.post( url, data, { headers: headers });
    }

    
  getUrbanisation( urbanisation_hash:any){
    let url = URL_SERVICIOS + '/public/urbanisation-data/get-info/' + urbanisation_hash;
    return this.http.post( url, null );
  }


  getMeeting(meeting_id: string){
     let url = URL_SERVICIOS + '/public/urbanisation-data/meeting-info/' + meeting_id;
      return this.http.post( url, null);
    }

    getFinalReport(meeting_id: string){
    let url = URL_SERVICIOS + '/public/urbanisation-data/final-report/' + meeting_id ;
    return this.http.post(url, null); 
    }


}
